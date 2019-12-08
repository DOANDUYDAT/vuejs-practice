<template>
  <v-container v-if="!checkProductEmpty">
    <div class="headline py-3">Sản phẩm tương tự</div>
    <!-- mandatory yêu cầu 1 value luôn được chọn, giúp slide tự cuộn lại khi thay đổi list slide-item -->
    <v-slide-group mandatory show-arrows>
      <v-slide-item v-for="productItem in suggestProduct" :key="productItem.id">
        <product-list-item :product="productItem" :maxWidthItem="175" :heightImage="80"></product-list-item>
      </v-slide-item>
    </v-slide-group>
  </v-container>
</template>
<script>
import ProductListItem from "@/home/ProductListItem";
import _ from "lodash";
import { mapState } from "vuex";

export default {
  components: {
    ProductListItem
  },
  data() {
    return {
      model: 0,
      rating: 3.5
    };
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      products: state => state.products.allProducts
    }),
    checkProductEmpty() {
      return _.isEmpty(this.product);
    },
    suggestProduct() {
      return this.suggestProductFollowBrand;
    },
    suggestProductFollowBrand() {
      if (!_.isEmpty(this.product)) {
        let supplier = this.product.supplier;
        let suggestProductFollowBrand = this.products.filter(
          product =>
            product.supplier === supplier
        );
        return suggestProductFollowBrand;
      }
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "@/variables.scss";

.container {
  background-color: $it-bg-in;
}
</style>
