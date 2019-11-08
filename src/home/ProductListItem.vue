<template>
  <v-card  hover height="100%" :max-width="maxWidthItem">
    <v-img :height="heightImage" :src="product.images[0]" contain></v-img>

    <v-card-text>
      <v-rating
        :value="rating"
        color="amber"
        background-color="grey"
        empty-icon="mdi-star-outline"
        full-icon="mdi-star"
        half-icon="mdi-star-half"
        half-increments
        small
        dense
        readonly
      ></v-rating>
      <p>{{ descriptionProduct }}</p>
      <strong>{{ priceProduct }}đ</strong>
    </v-card-text>
    <!-- <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        :disabled="!product.inventory"
        @click="addProductToCart({ product: product, quantity: 1 })"
      >MUA</v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import { formatCurrency } from "../_api/format-currency";

export default {
  data() {
    return {
      rating: 3.5
    };
  },
  props: {
    product: {},
    maxWidthItem: {
      type: Number,
      required: false,
      default: 500
    },
    heightImage: {
      type: Number,
      required: false,
      default: 200
    },
  },
  computed: {
    descriptionProduct() {
      let description =
        this.product.title.length < 40
          ? this.product.title
          : this.product.title.slice(0, 40) + "...";
      return description;
    },
    priceProduct() {
      let price =
        this.product.gia_khuyen_mai.length > 0
          ? this.product.gia_khuyen_mai
          : this.product.gia_ban_le;
      return formatCurrency(price);
    }
  },
  methods: {
    ...mapActions("cart", ["addProductToCart"])
  }
};
</script>

<style scoped>

</style>

