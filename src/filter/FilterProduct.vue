<template>
  <v-container class="px-0">
    <!-- <ValidationObserver ref="filterProduct"> -->
    <!-- <v-btn-toggle> -->
    <v-row no-gutters justify="space-around">
      <v-col cols="5">
        <v-btn @click="resetFilter" depressed outlined color="gg-red">Xóa bộ lọc</v-btn>
      </v-col>

      <v-col cols="5">
        <v-btn
          depressed
          color="gg-red"
          class="white--text"
          :loading="loading"
          :disabled="loading"
          @click="submit"
          width="100%"
        >Áp dụng</v-btn>
      </v-col>
    </v-row>
    <!-- <v-btn :loading="loading" :disabled="loading" @click="loader = 'loading'">Accept Terms 2</v-btn> -->
    <!-- </v-btn-toggle> -->
    <!-- <v-container fluid> -->
    <v-list>
      <v-list-item>
        <div>
          <div class="layout mb10 mx10">
            <div class="flex relative xs5">
              <ValidationProvider
                name="minPrice"
                rules="numeric"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field
                  v-model="filter.minPrice"
                  placeholder="Giá thấp nhất"
                  counter="8"
                  minlength="6"
                  maxlength="8"
                ></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="flex d-flex align-center justify-center xs2">-</div>
            <div class="flex relative xs5">
              <ValidationProvider
                name="maxPrice"
                rules="numeric"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field
                  v-model="filter.maxPrice"
                  placeholder="Giá cao nhất"
                  counter="8"
                  minlength="6"
                  maxlength="8"
                ></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
        </div>
      </v-list-item>
      <template v-for="item in items">
        <v-list-group no-action :key="item.text">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list shaped>
            <v-list-item-group v-model="filter[item.model]" multiple>
              <template v-for="(child, i) in item.children">
                <v-divider v-if="!child" :key="`divider-${i}`"></v-divider>
                <v-list-item
                  v-else
                  :key="`child.text-${i}`"
                  :value="child.text"
                  active-class="deep-purple--text text--accent-4"
                >
                  <template v-slot:default="{ active, toggle }">
                    <v-list-item-content>
                      <v-list-item-title v-text="child.text"></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-checkbox
                        :input-value="active"
                        :true-value="child.text"
                        color="deep-purple accent-4"
                        @click="toggle"
                      ></v-checkbox>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-list-group>
      </template>
    </v-list>
    <!-- </v-container> -->
    <!-- </ValidationObserver> -->
  </v-container>
</template>

<script>
import _ from 'lodash';
import { supplierService, filterService } from "@/_api";
export default {
  data() {
    return {
      filter: {
        minPrice: "",
        maxPrice: "",
        supplier: [],
        color: [],
        rom: [],
        frontCamera: [],
        rearCamera: [],
        operatingSystem: [],
        ram: []
      },
      //   toggle_exclusive: undefined,
      //   loader: null,
      loading: false,
      items: [
        // {
        //   text: "Giá",
        //   model: "price"
        //   children: [
        //     { text: "Dưới 5.000.000" },
        //     { text: "5.000.000 - 10.000.000" },
        //     { text: "10.000.000 - 20.000.000" },
        //     { text: "20.000.000 - 30.000.000" },
        //     { text: "Trên 30.000.000" }
        //   ]
        // },
        // {
        //   text: "Thương hiệu",
        //   model: "brand",
        //   children: [
        //     { text: "Sam Sung" },
        //     { text: "iPhone" },
        //     { text: "Xiaomi" },
        //     { text: "Oppo" },
        //     { text: "Realme" },
        //     { text: "Huawei" },
        //     { text: "NOKIA" }
        //   ]
        // },
        {
          text: "Màu sắc",
          model: "color",
          children: [
            { text: "Đen" },
            { text: "Xanh lam" },
            { text: "Xanh lục" },
            { text: "Vàng" },
            { text: "Đỏ" },
            { text: "Trắng" },
            { text: "Bạc" },
            { text: "Xám" },
            { text: "Tím" },
            { text: "Hồng" },
            { text: "Cam" },
            { text: "Đồng" },
            { text: "Xanh ngọc" }
          ]
        },
        {
          text: "Bộ nhớ trong",
          model: "rom",
          children: [
            { text: "16GB" },
            { text: "32GB" },
            { text: "64GB" },
            { text: "128GB" },
            { text: "256GB" },
            { text: "512GB" }
          ]
        },
        {
          text: "Camera sau",
          model: "backCamera",
          children: [
            { text: "2MP" },
            { text: "5MP" },
            { text: "8MP" },
            { text: "12MP" },
            { text: "13MP" },
            { text: "2x12MP" },
            { text: "3x12MP" },
            { text: "16MP" },
            { text: "24MP" },
            { text: "25MP" },
            { text: "32MP" },
            { text: "48MP" },
            { text: "64MP" }
          ]
        },
        {
          text: "Camera trước",
          model: "frontCamera",
          children: [
            { text: "2MP" },
            { text: "5MP" },
            { text: "7MP" },
            { text: "8MP" },
            { text: "12MP" },
            { text: "13MP" },
            { text: "16MP" },
            { text: "20MP" },
            { text: "24MP" },
            { text: "25MP" },
            { text: "48MP" },
            { text: "TOF 3D" }
          ]
        },
        {
          text: "Hệ điều hành",
          model: "operatingSystem",
          children: [
            { text: "Android 7.0" },
            { text: "Android 8.1" },
            { text: "Androi 9.0" },
            { text: "iOS 12" },
            { text: "iOS 13" }
          ]
        },
        {
          text: "RAM",
          model: "ram",
          children: [
            { text: "2GB" },
            { text: "3GB" },
            { text: "4GB" },
            { text: "6GB" },
            { text: "8GB" },
            { text: "12GB" }
          ]
        }
      ]
    };
  },
  methods: {
    loader() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 1000);
    },
    async submit() {
      const query = this.filter;
      console.log(query);
      const oldFilter = this.$route.query ? this.$route.query.filter : {};
      console.log(JSON.stringify(oldFilter));
      this.resetFilter();
      if (!_.isEqual(query, oldFilter)) {
        this.$router.push({ path: "/home", query: { filter: query } });
      }
      
      
    },
    resetFilter() {
      this.filter.minPrice = "";
      this.filter.maxPrice = "";
      this.filter.supplier = [];
      this.filter.color = [];
      this.filter.rom = [];
      this.filter.frontCamera = [];
      this.filter.rearCamera = [];
      this.filter.operatingSystem = [];
      this.filter.ram = [];
    },
    async getData() {
      const allSuppliers = await supplierService.getAllSuppliers();
      const suppliers = allSuppliers.map(e => {
        return {
          text: e.name
        };
      });
      this.items.unshift(
        Object.assign(
          {},
          {
            text: "Thương hiệu",
            model: "supplier",
            children: suppliers
          }
        )
      );
    }
  },

  created() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
@import "@/variables.scss";
.container {
  background-color: $it-bg-in;
}
</style>