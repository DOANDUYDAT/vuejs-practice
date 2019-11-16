<template>
  <div class="filter-product">
    <ValidationObserver ref="observer">
      <v-btn-toggle>
        <v-btn @click="reset" class="my-2" depressed style="width:150px"
          >Xóa bộ lọc</v-btn
        >
        <v-btn
          class="my-2"
          depressed
          style="width:147px"
          color="red"
          :loading="loading"
          :disabled="loading"
          @click="loader"
          >Áp dụng</v-btn
        >
        <!-- <v-btn :loading="loading" :disabled="loading" @click="loader = 'loading'">Accept Terms 2</v-btn> -->
      </v-btn-toggle>
      <v-container fluid>
        <v-row align="center">
          <v-col class="d-flex" cols="12" sm="12">
            <v-select
              :items="items1"
              attach
              chips
              label="Giá"
              multiple
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="12">
            <v-select
              :items="items2"
              chips
              label="Thương hiệu"
              multiple
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="12">
            <v-select :items="items3" chips label="Màu sắc" multiple></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="12">
            <v-select
              :items="items4"
              chips
              label="Bộ nhớ trong điện thoại"
              multiple
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="12">
            <v-select
              :items="items5"
              chips
              label="Camera sau điện thoại"
              multiple
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="12">
            <v-select
              :items="items6"
              chips
              label="Camera trước điện thoại"
              multiple
            ></v-select>
          </v-col>
          <!-- <v-col class="d-flex" cols="12" sm="12">
            <v-select :items="items7" label="Chip điện thoại"></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="12">
            <v-select :items="items8" label="Cổng sạc điện thoại"></v-select>
          </v-col>-->
          <v-col class="d-flex" cols="12" sm="12">
            <v-select
              :items="items9"
              chips
              label="Hệ điều hành điện thoại"
              multiple
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="12">
            <v-select
              :items="items10"
              chips
              label="RAM điện thoại"
              multiple
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   toggle_exclusive: undefined,
      //   loader: null,
      loading: false
    };
  },
  data: () => ({
    items1: [
      "Dưới 5.000.000",
      "5.000.000 - 10.000.000",
      "10.000.000 - 20.000.000",
      "20.000.000 - 30.000.000",
      "Trên 30.000.000"
    ],
    items2: [
      "Sam Sung",
      "iPhone",
      "Xiaomi",
      "Oppo",
      "Realme",
      "Huawei",
      "NOKIA"
    ],
    items3: [
      "Đen",
      "Xanh lam",
      "Xanh lục",
      "Vàng",
      "Đỏ",
      "Trắng",
      "Bạc",
      "Xám",
      "Tím",
      "Hồng",
      "Cam",
      "Đồng",
      "Xanh ngọc"
    ],
    items4: ["16GB", "32GB", "64GB", "128GB", "256GB", "512GB"],
    items5: [
      "2MP",
      "5MP",
      "8MP",
      "12MP",
      "13MP",
      "2x12MP",
      "3x12MP",
      "16MP",
      "24MP",
      "25MP",
      "32MP",
      "48MP",
      "64MP"
    ],
    items6: [
      "2MP",
      "5MP",
      "7MP",
      "8MP",
      "12MP",
      "13MP",
      "16MP",
      "20MP",
      "24MP",
      "25MP",
      "48MP",
      "TOF 3D"
    ],
    items9: ["Android 7.0", "Android 8.1", "Androi 9.0", "iOS 12", "iOS 13"],
    items10: ["2GB", "3GB", "4GB", "6GB", "8GB", "12GB"]
  }),

  //   watch: {
  //     loader() {
  //       const l = this.loader;
  //       this[l] = !this[l];
  //       setTimeout(() => (this[l] = false), 3000);

  //       this.loader = null;
  //     }
  //   },
  // watch: {
  //   menu() {
  //     this.$refs.form.reset();
  //   }
  // },
  methods: {
    loader() {
      (this.loading = true), setTimeout(() => (this.loading = false), 2000);
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style scoped>
.label {
  color: black;
  font-weight: bold;
}
</style>
