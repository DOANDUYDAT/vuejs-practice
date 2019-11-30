<template>
  <v-data-table
    @click:row="goToOrderDetailPage"
    :headers="headers"
    :items="orders"
    :sort-by="['date']"
    item-key="id"
    :sort-desc="[true]"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>CRUD Orders</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search theo id của đơn hàng"
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
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.id" label="Id" disabled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.userId" label="User Id" disabled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.username" label="User name" disabled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.staffId" label="Staff Id" disabled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.date" label="Date" disabled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select :items="status" v-model="editedItem.status" label="Status" outlined></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
import { fakeOrders } from "@/_helpers/fake-orders";

export default {
  data: () => ({
    dialog: false,
    search: "",
    status: ["Đang giao hàng", "Đã xác nhận", "Hoàn thành"],
    headers: [
      {
        text: "Id",
        value: "id",
        sortable: false,
        filterable: true
      },
      { text: "User Id", value: "userId", sortable: false, filterable: false },
      {
        text: "User name",
        value: "username",
        sortable: true,
        filterable: false
      },
      {
        text: "Staff Id",
        value: "staffId",
        sortable: false,
        filterable: false
      },
      { text: "Date", value: "date", sortable: true, filterable: false },
      { text: "Status", value: "status", sortable: true, filterable: false },
      { text: "Actions", value: "action", sortable: false, filterable: false }
    ],
    orders: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      userId: 0,
      username: "",
      staffId: 0,
      date: null,
      status: ""
    },
    defaultItem: {
      id: 0,
      userId: 0,
      username: "",
      staffId: 0,
      date: null,
      status: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Order" : "Edit Order";
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
      this.orders = fakeOrders();
    },

    editItem(item) {
      this.editedIndex = this.orders.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.orders.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.orders.splice(index, 1);
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
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },

    goToOrderDetailPage(order) {
      this.$router.push({ name: 'admin order', params: { orderId: order.orderId } });
    }
  }
};
</script>