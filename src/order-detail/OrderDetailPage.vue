<template>
  <!-- <v-container>

    <v-row justify="center" no-gutters>
      <v-col cols="3">
        <v-list flat class="py-0">
          <v-list-group no-action :value="true" prepend-icon="mdi-account-circle">
            <template v-slot:activator>
              <v-list-item-title>Account</v-list-item-title>
            </template>
            <v-list-item to="/account/profile" exact>
              <v-list-item-content>Profile</v-list-item-content>
            </v-list-item>
            <v-list-item to="/account/change-password" exact>
              <v-list-item-content>Đổi mật khẩu</v-list-item-content>
            </v-list-item>
            <v-list-item to="/account/history" exact>
              <v-list-item-content>Lịch sử mua hàng</v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-col>
      <v-col cols="9"> -->
        <v-card>
          <v-toolbar color="primary" dark flat>
            <v-card-title>
              <span class="headline">Đơn hàng 1</span>
            </v-card-title>
          </v-toolbar>
          <v-card-text class="px-10">Ngày đặt hàng 10/11/2019</v-card-text>
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-center" style="width:10%; font-size: 1rem;">STT</th>
                <th class="text-center" style="width:10%; font-size: 1rem;">Mã sản phẩm</th>
                <th class="text-center" style="width:15%; font-size: 1rem;">Hình ảnh</th>
                <th class="text-center" style="width:40%; font-size: 1rem;">Tên sản phẩm</th>
                <th class="text-center" style="width:10%; font-size: 1rem;">Số lượng</th>
                <th class="text-center" style="width:15%; font-size: 1rem;">Đơn giá</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in listProducts" :key="product.id">
                <td class="text-center">{{ index + 1 }}</td>
                <td class="text-center">{{ product.id }}</td>
                <td>
                  <v-img contain :height="80" :width="80" class="mx-auto" :src="product.images[0]"></v-img>
                </td>
                <td class="text-left">{{ product.title }}</td>
                <td class="text-center">{{ product.quantity }}</td>
                <td class="text-center">{{ formatCurrency(price(product)) }}đ</td>
              </tr>
            </tbody>
            <!-- <v-divider></v-divider> -->
            <tfoot>
              <!-- <td></td> -->
              <tr>
                <td colspan="5" class="text-end">
                  <v-card-text class="mx-auto color:white">
                    <label>
                      <b>Tổng tiền:</b>
                    </label>
                  </v-card-text>
                </td>
                <td class="text-center">
                  <span style="color: red" data-tongtien>{{ formatCurrency(total) }}đ</span>
                </td>
              </tr>
            </tfoot>
          </v-simple-table>
        </v-card>
      <!-- </v-col>
    </v-row>
  </v-container> -->
</template>
<script>
import { mapState } from "vuex";
import { formatCurrency } from "../_api/format-currency";
export default {
  data() {
    return {
      // order: { id, listProducts: []}
    };
  },
  computed: {
    ...mapState({
      products: state => state.products.all
    }),
    listProducts() {
      // listProducts = this.order.listProducts
      let listProducts = this.products.slice(0, 4);
      listProducts = listProducts.map(product => {
        const productFake = {
          ...product,
          quantity: Math.floor(Math.random() * 3) + 1
        };
        return productFake;
      });
      return listProducts;
    },
    total() {
      let total = 0;
      for (let i = 0; i < this.listProducts.length; i++) {
        const product = this.listProducts[i];
        total += product.quantity * this.price(product);
      }
      return total;
    }
  },
  methods: {
    price(product) {
      return product.gia_khuyen_mai.length > 0
        ? product.gia_khuyen_mai
        : product.gia_ban_le;
    },
    formatCurrency(price) {
      return formatCurrency(price);
    }
  },
  created() {
    //gọi api để nhạn thông tin về đơn hàng
    // this.order = data
  }
};
</script>

<style scoped>
/* .v-data-table td{
  height: 100px;
} */
</style>
