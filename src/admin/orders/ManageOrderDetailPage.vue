<template>
  <v-card>
    <!-- <v-toolbar> -->
    <v-card-title class="flex-grow-1">
      <span class="headline">Chi tiết đơn hàng {{ order.id }}</span>
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
            <th class="text-center" style="width:10%; font-size: 1rem;">STT</th>
            <th class="text-center" style="width:10%; font-size: 1rem;">ID</th>
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
              <v-img contain :height="80" :width="80" class="mx-auto" :src="product.image"></v-img>
            </td>
            <td class="text-center">{{ product.name }}</td>
            <td class="text-center">{{ product.quantity }}</td>
            <td class="text-center">{{ formatCurrency(product.price) }}đ</td>
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
              <span style="color: red" data-tongtien>{{ formatCurrency(order.total) }}đ</span>
            </td>
          </tr>
        </tfoot>
      </v-simple-table>
      <v-row justify="space-between">
        <v-col cols="12" md="3">
          <v-row class="pl-4">Người mua: {{ order.user.first_name + ' ' + order.user.last_name}}</v-row>
          <v-row class="pl-4">Ngày mua: {{ order.createdAt }}</v-row>
          <v-row class="pl-4">Số điện thoại: {{ order.user.phone }}</v-row>
          <v-row class="pl-4">Phương thức thanh toán: Tiền mặt</v-row>
        </v-col>
        <v-col cols="12" md="3">
          <v-row class="pl-4">Người nhận: {{ order.name }}</v-row>
          <!-- <v-row class="pl-4">Ngày nhận dự kiến: 07/11/2019</v-row> -->
          <v-row class="pl-4">Số điện thoại: {{ order.phone }}</v-row>
          <v-row class="pl-4">Địa chỉ: {{ order.address }}</v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { formatCurrency } from "@/_api/format-currency";
import { orderService } from "@/_api";

export default {
  data() {
    return {
      order: {},
      listProducts: []
    };
  },
  computed: {},
  methods: {
    formatCurrency(price) {
      return formatCurrency(price);
    },
    async getData() {
      const orderId = this.$route.params.orderId;
      this.order = await orderService.getOrder(orderId);
      this.listProducts = this.order.items.map(e => {
        return {
          id: e.product.id,
          quantity: e.quantity,
          name: e.product.name,
          price: e.product.price,
          image: e.product.images[0].image
        };
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>
