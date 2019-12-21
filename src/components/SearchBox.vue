<template>
  <div>
    <!-- dùng height = 10 và dense giúp giảm height của v-text-feild về min-height = 56px của v-input__slot -->
    <v-text-field
      autocomplete="off"
      solo-inverted
      flat
      dark
      color="it-blue-lighten"
      rounded
      clearable
      hide-details
      v-model="search"
      @keyup.enter="searchProduct"
      append-icon="mdi-magnify"
      @click:append="searchProduct"
      @focus="querySelections"
      label="Search"
    ></v-text-field>
    <!-- <v-expand-transition> -->
    <v-card v-if="itemsSearch.length && result" class="search__result mx-auto" :width="600" light>
      <v-list>
        <v-list-item-group>
          <v-list-item
            class="subtitle-1 py-1"
            v-for="item in itemsSearch"
            :key="item.id"
            @click="goToProductDetailPage(item.id)"
          >{{ item.name }}</v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <!-- </v-expand-transition> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import { productService, searchService } from "@/_api";
import _ from 'lodash';

export default {
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      result: false,
      products: []
    };
  },
  watch: {
    search: "querySelections"
  },
  computed: {
    productListSearch() {
      let productListSearch = this.products.map(e => {
        return {
          id: e.id,
          name: "Điện thoại " + e.supplier + " " + e.product.name + " " + e.rom + " (" + e.color + ")"
        };
      });
      return productListSearch;
    },
    itemsSearch() {
      return this.items.slice(0, 6);
    }
  },
  methods: {
    querySelections(value) {
      let search = this.search;

      this.loading = true;
      // Simulated ajax query

      if (search) {
        this.result = true;
        this.items = this.productListSearch.filter(e => {
          // return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
          return e.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
      } else {
        this.items = [];
      }
      this.loading = false;
    },
    searchProduct() {
      const query = this.search;
      const oldSearch = this.$route.query.search ? this.$route.query.search : {};
      this.result = false;
      this.search = "";
      if (!_.isEqual(query, oldSearch)) {
        this.$router.push({ path: "/search", query: { search: query } });
      }
      
      
    },
    async getData() {
      this.products = await productService.getAllProducts();
    },
    onBlur() {
      this.result = false;
      console.log('hello')
    },
    goToProductDetailPage(productId) {
      this.result = false;
      this.search = "";
      const currentPath = this.$route.fullPath;
      const url = `/products/${productId}`;
      if (currentPath !== url) {
        this.$router.push(url);
      }
      
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
@import "@/variables.scss";
.search__result {
  position: fixed;
  z-index: 999;
}
</style>