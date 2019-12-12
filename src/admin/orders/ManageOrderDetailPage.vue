<template>
  <v-card>
    <!-- <v-toolbar> -->
    <v-card-title class="flex-grow-1">
      <span class="headline">Chi tiết đơn hàng {{ getOrderId }}</span>
    </v-card-title>
    <!-- </v-toolbar> -->
    <v-card-text>
      <v-row justify="space-between">
        <v-col cols="12" md="3">Trạng thái: Đang giao hàng</v-col>
        <v-col cols="12" md="3">Nhân viên chốt đơn: DTT</v-col>
      </v-row>
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-center" style="width:10%; font-size: 1rem;">
              STT
            </th>
            <th class="text-center" style="width:10%; font-size: 1rem;">
              Mã sản phẩm
            </th>
            <th class="text-center" style="width:15%; font-size: 1rem;">
              Hình ảnh
            </th>
            <th class="text-center" style="width:40%; font-size: 1rem;">
              Tên sản phẩm
            </th>
            <th class="text-center" style="width:10%; font-size: 1rem;">
              Số lượng
            </th>
            <th class="text-center" style="width:15%; font-size: 1rem;">
              Đơn giá
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in listProducts" :key="product.id">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ product.id }}</td>
            <td>
              <v-img
                contain
                :height="80"
                :width="80"
                class="mx-auto"
                :src="product.images[0]"
              ></v-img>
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
              <span style="color: red" data-tongtien
                >{{ formatCurrency(total) }}đ</span
              >
            </td>
          </tr>
        </tfoot>
      </v-simple-table>
      <v-row justify="space-between">
        <v-col cols="12" md="3">
          <v-row class="pl-4">Người mua: KH001</v-row>
          <v-row class="pl-4">Ngày mua: 05/11/2019</v-row>
          <v-row class="pl-4">Số điện thoại: 0123456789</v-row>
          <v-row class="pl-4">Phương thức thanh toán: Tiền mặt</v-row>
        </v-col>
        <v-col cols="12" md="3">
          <v-row class="pl-4">Người nhận: Lê Thị Thành</v-row>
          <v-row class="pl-4">Ngày nhận dự kiến: 07/11/2019</v-row>
          <v-row class="pl-4">Số điện thoại: 0123456789</v-row>
          <v-row class="pl-4">Địa chỉ: Đại học Bách Khoa Hà Nội</v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { formatCurrency } from "@/_api/format-currency";
export default {
  data() {
    return {
      // order: { id, listProducts: []}
    };
  },
  computed: {
    ...mapState({
      products: state => state.products.allProducts
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
    },
    getOrderId() {
      const orderId = this.$route.params.orderId;
      return orderId;
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
