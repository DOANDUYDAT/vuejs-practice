<template>
  <v-data-table
    :headers="headers"
    :items="staffs"
    :sort-by="['id']"
    staff-key="id"
    :sort-asc="[true]"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Danh sách nhân viên</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          outlined
          dense
          placeholder="Search theo mã hoặc tên nhân viên"
          color="it-blue-lighten"
          single-line
          hide-details
        ></v-text-field>
        <v-dialog v-model="dialog" max-width="650px">
          <!-- <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>-->
          <v-card>
            <v-toolbar color="gg-red" dark flat>
              <v-card-title class="flex-grow-1 justify-center">
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
            </v-toolbar>
            <v-card-text class="py-0">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.id"
                      label="Staff Id"
                      outlined
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      :items="roles"
                      v-model="editedItem.role"
                      label="Role"
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
  </v-data-table>
</template>

<script>
import { userService, staffService } from "@/_api";
export default {
  data: () => ({
    dialog: false,
    search: "",
    roles: ["staff", "admin"],
    headers: [
      {
        text: "Staff ID",
        value: "id",
        sortable: false,
        filterable: true
      },
      {
        text: "Name",
        value: "name",
        sortable: true,
        filterable: true
      },
      { text: "Email", value: "email", sortable: false, filterable: false },
      { text: "Role", value: "role", sortable: false, filterable: false },
      { text: "Actions", align: "center", value: "action", filterable: false }
    ],
    staffs: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: "",
      email: "",
      role: ""
    },
    defaultItem: {
      id: 0,
      name: "",
      email: "",
      role: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Staff" : "Edit Staff";
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
      const users = await userService.getAllUsers();
      this.staffs = users
        .filter(e => e.role === "staff")
        .map(e => {
          return {
            ...e,
            name: e.firstName + " " + e.lastName
          };
        });
    },

    editItem(item) {
      this.editedIndex = this.staffs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      console.log("delete");
      console.log(item);
      const staffId = item.id;
      const confirmStatus = confirm(
        "Are you sure you want to delete this item?"
      );
      if (confirmStatus) {
        console.log(confirmStatus);
        try {
          const isSuccess = await staffService.deleteStaff(staffId);
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
      const staff = this.editedItem;
      try {
        const isSuccess = await staffService.updateStaff(staff);
        console.log(isSuccess);
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
    }
  }
};
</script>
