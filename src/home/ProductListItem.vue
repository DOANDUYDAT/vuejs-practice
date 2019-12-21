<template>
  <v-card
    v-if="product.id"
    hover
    height="100%"
    :max-width="maxWidthItem"
    flat
    :to="{ name: 'product detail', params: { productId: product.id }}"
    exact
  >
    <!-- eager giúp force các ảnh được load hết -->
    <v-img :height="heightImage" :src="product.images.length ? product.images[0].image : ''" contain eager></v-img>

    <v-card-text class="py-0">
      <v-rating
        :value="product.voting"
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
      <p class="mb-0">{{ product.name }}</p>
      <div class="py-2 font-weight-black">{{ formatCurrency(product.price) }}đ</div>
    </v-card-text>
    <!-- <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        :disabled="!product.inventory"
        @click="addProductToCart({ product: product, quantity: 1 })"
      >MUA</v-btn>
    </v-card-actions>-->
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import { formatCurrency } from "../_api/format-currency";
// import _ from "lodash";

export default {
  data() {
    return {
      rating: 3.5
    };
  },
  props: {
    product: {
      type: Object,
      required: true
    },
    maxWidthItem: {
      type: Number,
      required: false,
      default: 500
    },
    heightImage: {
      type: Number,
      required: false,
      default: 180
    }
  },
  computed: {
    // descriptionProduct() {
    //   let description =
    //     this.product.name.length < 30
    //       ? this.product.name
    //       : this.product.name.slice(0, 30) + "...";
    //   return description;
    // },
    // priceProduct() {
    //   let price = this.product.promotionalPrice.length
    //     ? this.product.promotionalPrice
    //     : this.product.retailPrice;
    //   return formatCurrency(price);
    // },
    // checkProductEmpty() {
    //   return _.isEmpty(this.product);
    // }
  },
  methods: {
    ...mapActions("cart", ["addProductToCart"]),
    formatCurrency(price) {
      return formatCurrency(price);
    }
  }
};
</script>

<style scoped>
</style>

