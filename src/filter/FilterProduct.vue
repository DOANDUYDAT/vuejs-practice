<template>
  <v-container>
    <!-- <ValidationObserver ref="filterProduct"> -->
    <!-- <v-btn-toggle> -->
    <v-row no-gutters>
      <v-col>
        <v-btn @click="resetFilter" depressed>Xóa bộ lọc</v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col>
        <v-btn
          depressed
          color="red"
          class="white--text"
          :loading="loading"
          :disabled="loading"
          @click="loader"
        >Áp dụng</v-btn>
      </v-col>
    </v-row>
    <!-- <v-btn :loading="loading" :disabled="loading" @click="loader = 'loading'">Accept Terms 2</v-btn> -->
    <!-- </v-btn-toggle> -->
    <!-- <v-container fluid> -->
    <v-list>
      <v-list-group no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Giá</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list shaped>
          <v-list-item-group v-model="price" multiple>
            <template v-for="(item1, i) in item1s">
              <v-divider v-if="!item1" :key="`divider-${i}`"></v-divider>
              <v-list-item
                v-else
                :key="`item1-${i}`"
                :value="item1"
                active-class="deep-purple--text text--accent-4"
              >
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item1"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-checkbox
                      :input-value="active"
                      :true-value="item1"
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

      <v-list-group no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Thương hiệu</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list shaped>
          <v-list-item-group v-model="brand" multiple>
            <template v-for="(item2, i) in item2s">
              <v-divider v-if="!item2" :key="`divider-${i}`"></v-divider>
              <v-list-item
                v-else
                :key="`item2-${i}`"
                :value="item2"
                active-class="deep-purple--text text--accent-4"
              >
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item2"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-checkbox
                      :input-value="active"
                      :true-value="item2"
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

      <v-list-group no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Màu sắc</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list shaped>
          <v-list-item-group v-model="color" multiple>
            <template v-for="(item3, i) in item3s">
              <v-divider v-if="!item3" :key="`divider-${i}`"></v-divider>
              <v-list-item
                v-else
                :key="`item3-${i}`"
                :value="item3"
                active-class="deep-purple--text text--accent-4"
              >
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item3"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-checkbox
                      :input-value="active"
                      :true-value="item3"
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

      <v-list-group no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Bộ nhớ trong điện thoại</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list shaped>
          <v-list-item-group v-model="ROM" multiple>
            <template v-for="(item4, i) in item4s">
              <v-divider v-if="!item4" :key="`divider-${i}`"></v-divider>
              <v-list-item
                v-else
                :key="`item4-${i}`"
                :value="item4"
                active-class="deep-purple--text text--accent-4"
              >
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item4"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-checkbox
                      :input-value="active"
                      :true-value="item4"
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

      <v-list-group no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Camera sau điện thoại</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list shaped>
          <v-list-item-group v-model="frontCamera" multiple>
            <template v-for="(item5, i) in item5s">
              <v-divider v-if="!item5" :key="`divider-${i}`"></v-divider>
              <v-list-item
                v-else
                :key="`item5-${i}`"
                :value="item5"
                active-class="deep-purple--text text--accent-4"
              >
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item5"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-checkbox
                      :input-value="active"
                      :true-value="item5"
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

      <v-list-group no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Camera trước điện thoại</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list shaped>
          <v-list-item-group v-model="backCamera" multiple>
            <template v-for="(item6, i) in item6s">
              <v-divider v-if="!item6" :key="`divider-${i}`"></v-divider>
              <v-list-item
                v-else
                :key="`item6-${i}`"
                :value="item6"
                active-class="deep-purple--text text--accent-4"
              >
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item6"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-checkbox
                      :input-value="active"
                      :true-value="item6"
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

      <v-list-group no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Hệ điều hành điện thoại</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list shaped>
          <v-list-item-group v-model="system" multiple>
            <template v-for="(item9, i) in item9s">
              <v-divider v-if="!item9" :key="`divider-${i}`"></v-divider>
              <v-list-item
                v-else
                :key="`item9-${i}`"
                :value="item9"
                active-class="deep-purple--text text--accent-4"
              >
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item9"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-checkbox
                      :input-value="active"
                      :true-value="item9"
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

      <v-list-group no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>RAM điện thoại</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list shaped>
          <v-list-item-group v-model="RAM" multiple>
            <template v-for="(item10, i) in item10s">
              <v-divider v-if="!item10" :key="`divider-${i}`"></v-divider>
              <v-list-item
                v-else
                :key="`item10-${i}`"
                :value="item10"
                active-class="deep-purple--text text--accent-4"
              >
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item10"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-checkbox
                      :input-value="active"
                      :true-value="item10"
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
    </v-list>
    <!-- </v-container> -->
    <!-- </ValidationObserver> -->
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      price: [],
      brand: [],
      color: [],
      ROM: [],
      frontCamera: [],
      backCamera: [],
      system: [],
      RAM: [],
      //   toggle_exclusive: undefined,
      //   loader: null,
      loading: false,
      item1s: [
        "Dưới 5.000.000",
        "5.000.000 - 10.000.000",
        "10.000.000 - 20.000.000",
        "20.000.000 - 30.000.000",
        "Trên 30.000.000"
      ],
      item2s: [
        "Sam Sung",
        "iPhone",
        "Xiaomi",
        "Oppo",
        "Realme",
        "Huawei",
        "NOKIA"
      ],
      item3s: [
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
      item4s: ["16GB", "32GB", "64GB", "128GB", "256GB", "512GB"],
      item5s: [
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
      item6s: [
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
      item9s: ["Android 7.0", "Android 8.1", "Androi 9.0", "iOS 12", "iOS 13"],
      item10s: ["2GB", "3GB", "4GB", "6GB", "8GB", "12GB"]
    };
  },
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
      this.loading = true;
      setTimeout(() => (this.loading = false), 1000);
    },
    resetFilter() {
      this.price = [];
      this.brand = [];
      this.color = [];
      this.ROM = [];
      this.frontCamera = [];
      this.backCamera = [];
      this.system = [];
      this.RAM = [];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style.scss";
.container {
  background-color: $it-bg-in;
}
</style>