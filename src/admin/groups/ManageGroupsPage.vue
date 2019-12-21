<template>
  <v-data-table
    :headers="headers"
    :items="groups"
    sort-by="id"
    class="elevation-1"
    item-key="id"
    :sort-asc="[true]"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Danh sách nhóm</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="gg-red" class="mx-4 white--text" dark v-on="on">+ Thêm group</v-btn>
          </template>
          <v-card>
            <v-toolbar color="gg-red" dark flat>
              <v-card-title class="flex-grow-1 justify-center">
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
            </v-toolbar>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="3">
                    <v-subheader><b>Name:</b></v-subheader>
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      v-model="editedItem.name"
                      outlined
                      placeholder="Name"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="12" sm="3">
                    <v-subheader><b>Role:</b></v-subheader>
                  </v-col>
                  <v-col cols="12" sm="9">
                    <v-container align="center">
                      <v-select
                        v-model="editedItem.role"
                        :items="roles"
                        multiple
                        outlined
                        placeholder="Role"
                      >
                        <template v-slot:selection="{ role, index }">
                          <v-chip v-if="index === 0">
                            <span>{{ editedItem.role }}</span>
                          </v-chip>
                        </template>
                      </v-select>
                    </v-container>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="it-blue-lighten" text @click="close">Cancel</v-btn>
              <v-btn color="it-blue-lighten" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          outlined
          dense
          placeholder="Search with Id or Name"
          color="it-blue-lighten"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click.stop="editItem(item)"
        color="it-blue-lighten"
        >mdi-pencil</v-icon
      >
      <v-icon small @click.stop="deleteItem(item)" color="gg-red"
        >mdi-trash-can-outline</v-icon
      >
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="getData">Reset</v-btn>
    </template>
  </v-data-table>
</template>
<script>
import { groupService } from "@/_api";
// import _ from "lodash";

export default {
  data: () => ({
    allPermissions: [],
    dialog: false,
    search: "",
    roles: ["user", "staff", "admin"],
    headers: [
      {
        text: "Group ID",
        value: "id",
        align: "left",
        sortable: false,
        filterable: true
      },
      {
        text: "Group Name",
        value: "name",
        align: "left",
        sortable: false,
        filterable: true
      },
      {
        text: "Role Name",
        value: "role",
        align: "left",
        sortable: false,
        filterable: true
      },
      { text: "Actions", align: "left", value: "action", filterable: false }
    ],
    groups: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      role: []
    },
    defaultItem: {
      id: "",
      name: "",
      role: []
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Group" : "Edit Group";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.groups = await groupService.getAllGroups();
      this.allPermissions = await groupService.getAllPermissions();
    },

    editItem(item) {
      this.editedIndex = this.groups.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      const groupId = item.id;
      const confirmStatus = confirm(
        "Are you sure you want to delete this item?"
      );
      if (confirmStatus) {
        try {
          console.log("deleteGroup");
          const isSuccess = await groupService.deleteGroup(groupId);
          if (isSuccess) {
            await this.getData();
            this.$store.dispatch("alert/success", {
              message: "Delete Successfully!"
            });
          }
        } catch (error) {
          if (error.response) {
            this.$store.dispatch("alert/error", {
              message: error.response.data.detail
            });
          }
        }
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    async save() {
      const group = this.editedItem;
      if (this.editedIndex > -1) {
        try {
          console.log("updateGroup");
          const isSuccess = await groupService.updateGroup(group);
          if (isSuccess) {
            await this.getData();
            this.$store.dispatch("alert/success", {
              message: "Update Successfully!"
            });
            this.close();
          }
        } catch (error) {
          this.$store.dispatch("alert/error", {
            message: error
          });
        }
      } else {
        try {
          console.log("createGroup");
          const isSuccess = await groupService.createGroup(group);
          if (isSuccess) {
            await this.getData();
            this.$store.dispatch("alert/success", {
              message: "Add Successfully!"
            });
            this.close();
          }
        } catch (error) {
          if (error.response) {
            this.$store.dispatch("alert/error", {
              message: error.response.data.detail
            });
          }
        }
      }
    }
  }
};
</script>
