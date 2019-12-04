<template>
  <v-data-table
    :headers="headers"
    :items="suppliers"
    sort-by="supplierId"
    class="elevation-1"
    user-key="supplierId"
    :sort-asc="[true]"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search with Id or Name"
          color="it-blue-lighten"
          single-line
          hide-details
        ></v-text-field>

        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="gg-red" dark v-on="on">+ Thêm nhà cung cấp</v-btn>
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
                    <v-text-field v-model="editedItem.supplierId" label="supplierId"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field v-model="editedItem.supplierName" label="supplierName"></v-text-field>
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
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click.stop="editItem(item)" color="it-blue-lighten">mdi-pencil</v-icon>
      <v-icon small @click.stop="deleteItem(item)" color="gg-red">mdi-trash-can-outline</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      {
        text: "Supplier ID",
        value: "supplierId",
        align: "left",
        sortable: false,
        filterable: true
      },
      {
        text: "Supplier Name",
        value: "supplierName",
        align: "left",
        sortable: false,
        filterable: true
      },
      { text: "Actions", align: "left", value: "action", filterable: false }
    ],
    suppliers: [],
    editedIndex: -1,
    editedItem: {
      supplierId: "",
      supplierName: ""
    },
    defaultItem: {
      supplierId: "",
      supplierName: ""
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
    this.initialize();
  },

  methods: {
    initialize() {
      this.suppliers = [
        { supplierId: "01", supplierName: "Sam Sung" },
        { supplierId: "02", supplierName: "Iphone" },
        { supplierId: "03", supplierName: "Xiaomi" },
        { supplierId: "04", supplierName: "Oppo" },
        { supplierId: "05", supplierName: "Realme" },
        { supplierId: "06", supplierName: "Huawei" },
        { supplierId: "07", supplierName: "NOKIA" }
      ];
    },

    editItem(item) {
      this.editedIndex = this.suppliers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.suppliers.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.suppliers.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.suppliers[this.editedIndex], this.editedItem);
      } else {
        this.suppliers.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>