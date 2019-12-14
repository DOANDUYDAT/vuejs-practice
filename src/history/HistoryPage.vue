<template>
  <v-card>
    <v-toolbar color="primary" dark flat>
      <v-card-title>
        <span class="headline">Đơn hàng của tôi</span>
      </v-card-title>
    </v-toolbar>
    <div v-if="orders.length">
      <v-card-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        @click:row="goToOrderDetailPage"
        style="font-size: 1rem;"
        :headers="headers"
        :items="orders"
        :search="search"
      >
        <template v-slot:item.status="{ item }">
          <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
        </template></v-data-table
      >
    </div>
    <div v-else class="headline text-center py-5">Bạn chưa có đơn hàng nào</div>
  </v-card>
</template>

<script>
import { formatCurrency } from "../_api/format-currency";
import { orderService } from "@/_api";

export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Mã đơn hàng",
          align: "center",
          sortable: false,
          value: "id"
        },
        { text: "Ngày đặt hàng", align: "center", value: "createdAt" },
        { text: "Tổng đơn", align: "center", value: "total" },
        {
          text: "Trạng thái đơn hàng",
          align: "center",
          sortable: false,
          value: "status"
        }
      ],
      orders: []
    };
  },
  computed: {},
  methods: {
    goToOrderDetailPage(order) {
      console.log(order);
      this.$router.push({ name: "orders", params: { orderId: order.id } });
    },
    async getData() {
      this.orders = await orderService.getAllOrders();
    },
    getColor(status) {
      if (status === "Đang giao hàng") return "red";
      else if (status === "XÁC NHẬN") return "orange";
      else return "green";
    }
  },
  created() {
    this.getData();
  }
};
</script>
