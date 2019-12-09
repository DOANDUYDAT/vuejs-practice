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
      @blur="onBlur"
      label="Search"
    ></v-text-field>
    <v-expand-transition>
      <v-card v-if="itemsSearch.length && result" class="search__result mx-auto" :width="600" light>
        <v-list>
          <v-list-item-group v-model="search">
            <v-list-item
              class="subtitle-1 py-1"
              v-for="item in itemsSearch"
              :key="item.id"
              :value="item.name"
            >{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-expand-transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { productService } from "@/_api";

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
          name: e.name
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
      console.log(this.search);
    },
    async getData() {
      this.products = await productService.getAllProducts();
    },
    onBlur() {
      setTimeout(() => {
        this.result = false;
      }, 100);
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
}
</style>