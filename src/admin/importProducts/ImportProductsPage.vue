<template>
  <v-data-table
    @click:row="goToImportProductDetailPage"
    :headers="headers"
    :items="importProducts"
    :sort-by="['importProductId']"
    item-key="importProductId"
    :sort-asc="[true]"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Danh sách phiếu nhập</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn color="gg-red" dark class="mx-4 white--text">+ Nhập hàng</v-btn>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          placeholder="Search theo mã nhập hàng"
          outlined
          dense
          color="it-blue-lighten"
          single-line
          hide-details
        ></v-text-field>
        <!-- <template>
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template> -->
      </v-toolbar>
    </template>
    <template v-slot:item.total="{ item }">
      <span>{{ formatCurrency(item.total) }}đ</span>
    </template>
  </v-data-table>
</template>

<script>
import { formatCurrency } from "@/_api/format-currency";
export default {
  data: () => ({
    search: "",
    headers: [
      {
        text: "Mã nhập hàng",
        value: "importProductId",
        sortable: false,
        filterable: true
      },
      {
        text: "Thời gian",
        value: "time",
        sortable: true,
        filterable: false
      },
      {
        text: "Người nhập",
        value: "staff",
        sortable: false,
        filterable: false
      },
      { text: "Tổng tiền", value: "total", sortable: true, filterable: false }
    ],
    importProducts: [
      {
        importProductId: 1,
        time: "2019/10/20",
        staff: "Le Thanh",
        total: 222228900
      },
      {
        importProductId: 2,
        time: "2019/9/20",
        staff: "Duong Thoa",
        total: 222228900
      },
      {
        importProductId: 3,
        time: "2019/8/20",
        staff: "Doan Dat",
        total: 222228900
      }
    ]
  }),

  computed: {},

  methods: {
    goToImportProductDetailPage(importProduct) {
      this.$router.push({
        name: "admin importProduct",
        params: { importProductId: importProduct.importProductId }
      });
    },
    formatCurrency(total) {
      return formatCurrency(total);
    }
  }
};
</script>
