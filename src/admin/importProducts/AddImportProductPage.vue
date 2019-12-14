<template>
  <v-col>
    <v-row align="center">
      <v-col cols="2" class="py-0 text-center">
        <!-- <v-subheader class="headline bold">Nhập hàng</v-subheader> -->
        <v-card-title class="pt-2">
          <span class="headline mb-2">Nhập hàng</span>
        </v-card-title>
      </v-col>
      <v-col cols="6">
        <div class="search">
          <!-- dùng height = 10 và dense giúp giảm height của v-text-feild về min-height = 56px của v-input__slot -->
          <v-text-field
            autocomplete="off"
            solo
            color="it-blue-lighten"
            clearable
            hide-details
            v-model="search"
            @keyup.enter="searchProduct"
            append-icon="mdi-plus"
            prepend-inner-icon="mdi-magnify"
            @click:prepend-inner="searchProduct"
            @focus="querySelections"
            placeholder="Search"
          ></v-text-field>
          <v-expand-transition>
            <v-card v-if="itemsSuggest && result" class="search__result mx-auto" width="522" light>
              <v-card-text
                class="subtitle-1 py-1 px-4"
                v-for="item in itemsSuggest"
                :key="item.id"
                @click="chooseProduct(item)"
              >
                <v-row no-gutters>
                  <v-col cols="4">{{ item.id }}</v-col>
                  <v-col cols="8">{{ item.name }}</v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-expand-transition>
        </div>
      </v-col>
      <v-col
        cols="4"
        class="py-0 text-center"
      >Người nhập: {{ userInfo.firstName + " " + userInfo.lastName }}</v-col>
    </v-row>
    <v-card>
      <v-toolbar color="it-green-lighten" dark flat dense>
        <!-- <v-card-title class="layout justify-center"> -->
        <v-row>
          <v-col cols class="py-0 text-center">STT</v-col>
          <v-divider inset vertical></v-divider>
          <v-col cols="1" class="py-0 text-center">ID</v-col>
          <v-divider inset vertical></v-divider>
          <v-col cols="2" class="py-0 text-center">Tên sản phẩm</v-col>
          <v-divider inset vertical></v-divider>
          <v-col cols="1" class="py-0 px-0 text-center">Số lượng</v-col>
          <v-divider inset vertical></v-divider>
          <v-col cols="2" class="py-0 text-center">Giá nhập</v-col>
          <v-divider inset vertical></v-divider>
          <v-col cols="2" class="py-0 text-center">Giá bán</v-col>
          <v-divider inset vertical></v-divider>
          <v-col cols="2" class="py-0 text-center">Thành tiền</v-col>
          <v-divider inset vertical></v-divider>
          <v-col cols="1" class="py-0 text-center"></v-col>
        </v-row>
        <!-- </v-card-title> -->
      </v-toolbar>
      <v-card-text v-if="itemSelected.length" class="py-0">
        <v-row
          v-for="(item, index) in itemSelected"
          :key="item.id"
          class="product-item"
          align="center"
        >
          <v-col cols="1" class="text-center">{{ index + 1 }}</v-col>
          <v-col cols="1" class="text-center">{{ item.id }}</v-col>
          <v-col cols="2" class="text-center">{{ item.name }}</v-col>
          <v-col cols="1" class="text-center">
            <v-text-field v-model="item.quantity" type="number" dense hide-details outlined></v-text-field>
          </v-col>
          <v-col cols="2" class="text-center">
            <v-text-field v-model="item.importPrice" type="number" dense hide-details outlined></v-text-field>
          </v-col>
          <v-col cols="2" class="text-center">
            <v-text-field v-model="item.price" type="number" dense hide-details outlined></v-text-field>
          </v-col>
          <v-col cols="2" class="text-right">{{ sumMoney(item) }} đ</v-col>
          <v-col cols="1" class="text-center">
            <v-icon small @click.stop="deleteItem(item)" color="gg-red">mdi-trash-can-outline</v-icon>
          </v-col>
          <v-divider></v-divider>
        </v-row>
        <v-row align="center">
          <v-col cols="9" class="text-right py-0">
            <v-card-text class="mx-auto color:white">
              <b>Tổng tiền:</b>
            </v-card-text>
          </v-col>
          <v-col cols="2" class="text-right py-0">
            <span class="red--text" data-tongtien>{{ formatCurrency(total) }} đ</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="11" class="text-end pt-0">
            <v-btn color="gg-red" class="white--text" @click="submit">Nhập hàng</v-btn>
          </v-col>
          <v-col cols="1" class="pt-0"></v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { mapState } from "vuex";
import { productService, userService, importProductService } from "@/_api";
import { formatCurrency } from "@/_api/format-currency";
export default {
  data() {
    return {
      loading: false,
      itemsSuggest: [],
      search: null,
      result: false,
      products: [],
      itemSelected: [],
      userInfo: {}
    };
  },
  watch: {
    search: "querySelections"
  },
  computed: {
    productListToSearch() {
      let productListToSearch = this.products.map(e => {
        return {
          id: e.id,
          name: e.name,
          importPrice: e.importPrice,
          price: e.price,
          quantity: 0
        };
      });
      return productListToSearch;
    },
    total() {
      if (this.itemSelected.length) {
        let total = 0;
        this.itemSelected.forEach(item => {
          const quantity = Number(item.quantity);
          const importPrice = Number(item.importPrice);
          total += quantity * importPrice;
        });
        return Number(total);
      }
    }
  },
  methods: {
    async submit() {
      const { itemSelected, total } = this;
      const importOrder = {
        items: itemSelected,
        total
      };
      try {
        const isSuccess = await importProductService.createImportProduct(
          importOrder
        );
        if (isSuccess) {
          this.$store.dispatch("alert/success", {
            message: "Import Successfully!"
          });
          this.itemSelected = [];
        }
      } catch (error) {
        if (error.response) {
          this.$store.dispatch("alert/error", {
            message: error.response.data
          });
        }
      }
    },
    querySelections() {
      let search = this.search;

      this.loading = true;
      // Simulated ajax query

      if (search) {
        this.result = true;
        this.itemsSuggest = this.productListToSearch.filter(e => {
          return e.id.toString().startsWith(search);
        });
      } else {
        this.itemsSuggest = [];
      }
      this.loading = false;
    },
    searchProduct() {
      console.log(this.search);
    },
    chooseProduct(item) {
      this.result = false;
      if (this.itemSelected.find(e => e.id === item.id)) {
        console.log("san pham da dc chon");
      } else {
        this.itemSelected.push(item);
      }

      this.search = "";
    },
    async getData() {
      this.products = await productService.getAllProducts();
      this.userInfo = await userService.getProfile();
    },
    sumMoney(item) {
      const quantity = Number(item.quantity);
      const importPrice = Number(item.importPrice);
      return formatCurrency(quantity * importPrice);
    },
    deleteItem(item) {
      const index = this.itemSelected.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.itemSelected.splice(index, 1);
    },
    formatCurrency(total) {
      return formatCurrency(total);
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
.product-item {
  border-bottom: 1px solid #dddddd;
}
</style>
