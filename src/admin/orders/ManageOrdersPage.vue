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
          label="Search theo id hoặc trạng thái đơn hàng"
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
                    <v-text-field v-model="editedItem.userEmail" label="User Email" disabled></v-text-field>
                  </v-col>
                  <!-- <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.staffId" label="Staff Id" disabled></v-text-field>
                  </v-col>-->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.createdAt" label="Date" disabled></v-text-field>
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
      <!-- <v-icon small @click.stop="deleteItem(item)" color="gg-red">mdi-trash-can-outline</v-icon> -->
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="getData">Reset</v-btn>
    </template>
    <template v-slot:item.status="{ item }">
      <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
    </template>
  </v-data-table>
</template>

<script>
import { fakeOrders } from "@/_helpers/fake-orders";
import { orderService } from "@/_api";
// import _ from "lodash";
export default {
  data: () => ({
    dialog: false,
    search: "",
    status: ["Đang giao hàng", "Hoàn thành"],
    headers: [
      {
        text: "Id",
        value: "id",
        sortable: false,
        filterable: true
      },
      { text: "User Id", value: "user.id", sortable: false, filterable: false },
      {
        text: "User email",
        value: "user.email",
        sortable: true,
        filterable: false
      },
      // {
      //   text: "Staff Id",
      //   value: "staffId",
      //   sortable: false,
      //   filterable: false
      // },
      { text: "Date", value: "createdAt", sortable: true, filterable: false },
      { text: "Status", value: "status", sortable: true, filterable: true },
      { text: "Actions", value: "action", sortable: false, filterable: false }
    ],
    orders: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      userId: 0,
      userEmail: "",
      // staffId: 0,
      createdAt: null,
      status: ""
    },
    defaultItem: {
      id: 0,
      userId: 0,
      userEmail: "",
      // staffId: 0,
      createdAt: null,
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
  methods: {
    async getData() {
      // const allOrders = await orderService.getAllOrders();
      this.orders = await orderService.getAllOrders();
      // this.orders = fakeOrders();
    },

    editItem(item) {
      console.log(item);
      this.editedIndex = this.orders.indexOf(item);
      this.editedItem = Object.assign({}, {
        id: item.id,
        userId: item.user.id,
        userEmail: item.user.email,
        createdAt: item.createdAt,
        status: item.status
      });
      this.dialog = true;
    },

    async deleteItem(item) {
      const orderId = item.id;
      const confirmStatus = confirm(
        "Are you sure you want to delete this item?"
      );
      if (confirmStatus) {
        try {
          const isSuccess = await orderService.deleteOrder(orderId);
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
      const order = this.editedItem;
      try {
        const isSuccess = await orderService.updateOrder(order);
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
    },

    getColor(status) {
      if (status == "Đang giao hàng") return "red";
      else if (status == "XÁC NHẬN") return "orange";
      else return "green";
    },

    goToOrderDetailPage(order) {
      this.$router.push({ name: "admin order", params: { orderId: order.id } });
    }
  },
  created() {
    this.getData();
  }
};
</script>