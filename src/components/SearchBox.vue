<template>
  <!-- <v-row justify="center" no-gutters>
  <v-col>-->
  <div class="px-3">
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
      @blur="result = false"
      label="Search"
    ></v-text-field>
    <v-expand-transition>
      <v-card v-if="itemsSearch && result" class="search__result" light>
        <v-card v-for="item in itemsSearch" :key="item">
          <v-card-text class="subtitle-1 py-1">{{ item }}</v-card-text>
        </v-card>
      </v-card>
    </v-expand-transition>
  </div>
  <!-- </v-col>
  </v-row>-->
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      result: false
    };
  },
  watch: {
    search: "querySelections"
  },
  methods: {
    querySelections() {
      let search = this.search;

      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        if (search) {
          this.result = true;
          this.items = this.productListSearch.filter(e => {
            // return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
            return e.toLowerCase().indexOf(search.toLowerCase()) > -1;
          });
        } else {
          this.items = [];
        }
        this.loading = false;
      }, 200);
    },
    searchProduct() {
      console.log(this.search);
    }
  },
  computed: {
    ...mapState({
      products: state => state.products.all
    }),
    productListSearch() {
      let productListSearch = this.products.map(e => e.title);
      return productListSearch;
    },
    itemsSearch() {
      return this.items.slice(0, 6);
    }
  }
};
</script>

<style scoped>
.search__result {
  position: fixed;
}
</style>