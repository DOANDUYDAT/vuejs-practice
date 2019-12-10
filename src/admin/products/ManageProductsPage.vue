<template>
  <v-data-table
    @click:row="goToEditProductPage"
    :headers="headers"
    :items="products"
    :sort-by="['id']"
    item-key="id"
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
      <v-btn color="primary" @click="getData">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { fakeOrders } from "@/_helpers/fake-orders";
import { productService } from "@/_api";

export default {
  data: () => ({
    dialog: false,
    search: "",
    products: [],
    headers: [
      {
        text: "Product Id",
        value: "id",
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
      { text: "ListedPrice", value: "listedPrice", sortable: true, filterable: false },
      { text: "RetailPrice", value: "retailPrice", sortable: true, filterable: false },
      { text: "PromotionPrice", value: "promotionalPrice", sortable: true, filterable: false },
      {
        text: "Quantity",
        value: "count",
        sortable: true,
        filterable: false
      },
      { text: "Actions", align: "center", value: "action", filterable: false }
    ]
  }),

  computed: {},

  methods: {
    async deleteItem(item) {
      const productId = item.id;
      confirm("Are you sure you want to delete this item?");
      try {
        const isSuccess = await productService.deleteProduct(productId);
        if (isSuccess) {
          await this.getData();
          this.$store.dispatch("alert/success", {
            message: "Delete Successfully!"
          });
        }
      } catch (error) {
        this.$store.dispatch("alert/error", {
          message: error
        });
      }
    },

    goToEditProductPage(product) {
      this.$router.push({
        name: "admin product",
        params: { productId: product.id }
      });
    },

    async getData() {
      this.products = await productService.getAllProducts();
    }
  },
  created() {
    this.getData();
  }
};
</script>