<template>
  <v-card>
    <v-toolbar color="primary" dark flat>
      <v-card-title>
        <span class="headline">Đơn hàng 1</span>
      </v-card-title>
    </v-toolbar>
    <v-card-text class="px-10"
      >Ngày đặt hàng: {{ order.createdAt }}</v-card-text
    >
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-center" style="width:10%; font-size: 1rem;">STT</th>
          <th class="text-center" style="width:10%; font-size: 1rem;">ID</th>
          <th class="text-center" style="width:15%; font-size: 1rem;">
            Hình ảnh
          </th>
          <th class="text-center" style="width:35%; font-size: 1rem;">
            Tên sản phẩm
          </th>
          <th class="text-center" style="width:15%; font-size: 1rem;">
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
          <td class="text-center">
            <v-img
              contain
              :height="80"
              :width="80"
              class="mx-auto"
              :src="product.image"
            ></v-img>
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
            <span style="color: red" data-tongtien
              >{{ formatCurrency(total) }}đ</span
            >
          </td>
        </tr>
      </tfoot>
    </v-simple-table>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { formatCurrency } from "../_api/format-currency";
import { orderService, productService } from "@/_api";

export default {
  data() {
    return {
      order: {},
      listProducts: []
    };
  },
  computed: {
    orderId() {
      return this.$route.params.orderId;
    },
    total() {
      return this.order.total;
    }
  },
  methods: {
    formatCurrency(total) {
      return formatCurrency(total);
    },
    async getData() {
      const orderId = this.orderId;
      this.order = await orderService.getOrder(orderId);
      this.listProducts = this.order.items.map(e => {
        return {
          id: e.product.id,
          quantity: e.quantity,
          name: "Điện thoại " + e.product.supplier + " " + e.product.name + " " + e.product.rom + " (" + e.product.color + ")",
          price: e.product.price,
          image: e.product.images.length ? e.product.images[0].image : ""
        };
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
/* .v-data-table td{
  height: 100px;
} */
</style>
