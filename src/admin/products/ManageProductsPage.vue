<template>
  <v-data-table
    @click:row="goToEditProductPage"
    :headers="headers"
    :items="products"
    :sort-by="['productId']"
    item-key="productId"
    :sort-asc="[true]"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>CRUD Products</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search theo id của sản phẩm"
          color="it-blue-lighten"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
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
    headers: [
      {
        text: "Product Id",
        value: "productId",
        sortable: false,
        filterable: true
      },
      {
        text: "Image",
        value: "image",
        sortable: false,
        filterable: false
      },
      { text: "Name", value: "name", sortable: false, filterable: false },
      { text: "Price", value: "price", sortable: true, filterable: false },
      { text: "Quantity", value: "quantity", sortable: true, filterable: false },
      { text: "Actions", align: "center", value: "action", filterable: false }
    ],
    products: [
      {
        productId: 1,
        image: "",
        supplier: "SAMSUNG",
        guarantee: "12 tháng",
        guaranteeDes: "",
        name: "Điện thoại Galaxy Note 10",
        color: "Bạc",
        screen: "6.3\" Dynamic AMOLED",
        resolution: "Full HD+ (1080 x 2280 Pixels)",
        rearCamera: "16MP",
        frontCamera: "10MP",
        chip: "Exynos 9825",
        ram: "8GB",
        rom: "256GB",
        pin: "3500 mAh",
        operatingSystem: "Android 9.0",
        chargingPort: "USB Type-C",
        sim: "2 Nano SIM",
        price: "5990000",
        quantity: "25"
      },
      {
        productId: 2,
        image: "",
        supplier: "SAMSUNG",
        guarantee: "12 tháng",
        guaranteeDes: "",
        name: "Điện thoại Galaxy Note 10",
        color: "Bạc",
        screen: "6.3\" Dynamic AMOLED",
        resolution: "Full HD+ (1080 x 2280 Pixels)",
        rearCamera: "16MP",
        frontCamera: "10MP",
        chip: "Exynos 9825",
        ram: "8GB",
        rom: "256GB",
        pin: "3500 mAh",
        operatingSystem: "Android 9.0",
        chargingPort: "USB Type-C",
        sim: "2 Nano SIM",
        price: "22990000",
        quantity: "30"
      }
    ],
  }),

  computed: {
  },

  methods: {
    deleteItem(item) {
      const index = this.products.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.products.splice(index, 1);
    },

    goToEditProductPage(product) {
      this.$router.push({ name: 'admin product', params: { productId: product.productId } });
    }
  }
};
</script>