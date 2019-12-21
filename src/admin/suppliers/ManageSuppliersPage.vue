<template>
  <v-data-table
    :headers="headers"
    :items="suppliers"
    sort-by="id"
    class="elevation-1"
    item-key="id"
    :sort-asc="[true]"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Danh sách nhà cung cấp</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="gg-red" class="mx-4 white--text" dark v-on="on">+ Thêm nhà cung cấp</v-btn>
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
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field
                      v-model="editedItem.name"
                      outlined
                      placeholder="Name"
                    ></v-text-field>
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
          placeholder="Search theo mã hoặc tên"
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
import { supplierService } from "@/_api";
// import _ from "lodash";

export default {
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      {
        text: "Supplier ID",
        value: "id",
        align: "left",
        sortable: false,
        filterable: true
      },
      {
        text: "Supplier Name",
        value: "name",
        align: "left",
        sortable: false,
        filterable: true
      },
      { text: "Actions", align: "left", value: "action", filterable: false }
    ],
    suppliers: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: ""
    },
    defaultItem: {
      id: "",
      name: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Supplier" : "Edit Supplier";
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
      this.suppliers = await supplierService.getAllSuppliers();
    },

    editItem(item) {
      this.editedIndex = this.suppliers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      const supplierId = item.id;
      const confirmStatus = confirm(
        "Are you sure you want to delete this item?"
      );
      if (confirmStatus) {
        try {
          const isSuccess = await supplierService.deleteSupplier(supplierId);
          if (isSuccess) {
            await this.getData();
            this.$store.dispatch("alert/success", {
              message: "Delete Successfully!"
            });
          }
        } catch (error) {
          if (error.response) {
            this.$store.dispatch("alert/error", {
              message: error.response.data.message
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
      const supplier = this.editedItem;
      if (this.editedIndex > -1) {
        try {
          const isSuccess = await supplierService.updateSupplier(supplier);
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
      } else {
        try {
          const isSuccess = await supplierService.createSupplier(supplier);
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
              message: error.response.data.message
            });
          }
        }
      }
    }
  }
};
</script>
