<template>
  <v-card>
      <v-toolbar color="primary" dark flat>
      <v-card-title>
        <span class="headline">Đơn hàng của tôi</span>
      </v-card-title>
    </v-toolbar>
    <v-card-title>
      <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
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
    ></v-data-table>
  </v-card>
</template>

<script>
import { formatCurrency } from "../_api/format-currency";

export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Mã đơn hàng",
          align: "center",
          sortable: false,
          value: "orderId"
        },
        { text: "Ngày đặt hàng", align: "center", value: "created" },
        { text: "Tổng đơn", align: "center", value: "total" },
        {
          text: "Trạng thái đơn hàng",
          align: "center",
          sortable: false,
          value: "status"
        }
      ],
      orders: [
        {
          orderId: 1,
          created: "10/11/2019",
          total: "22990000",
          status: "Đang giao hàng"
        },
        {
          orderId: 2,
          created: "10/09/2018",
          total: "9299000",
          status: "Hoàn thành"
        },
        {
          orderId: 3,
          created: "10/11/2018",
          total: "82990000",
          status: "Hoàn thành"
        },
        {
          orderId: 4,
          created: "06/11/2017",
          total: "72990000",
          status: "Hoàn thành"
        },
        {
          orderId: 5,
          created: "10/07/2018",
          total: "52990000",
          status: "Hoàn thành"
        },
        {
          orderId: 6,
          created: "19/04/2018",
          total: "22990000",
          status: "Hoàn thành"
        },
        {
          orderId: 7,
          created: "03/12/2019",
          total: "12990000",
          status: "Hoàn thành"
        },
        {
          orderId: 8,
          created: "10/05/2018",
          total: "42990000",
          status: "Hoàn thành"
        },
        {
          orderId: 9,
          created: "20/07/2019",
          total: "32990000",
          status: "Hoàn thành"
        },
        {
          orderId: 10,
          created: "31/12/2018",
          total: "2299000",
          status: "Hoàn thành"
        }
      ]
    };
  },
  computed: {},
  methods: {
    goToOrderDetailPage(order) {
      this.$router.push({ name: 'orders', params: { order_id: order.orderId } });
    }
  }
};
</script>
