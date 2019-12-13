<template>
  <v-card>
    <!-- <v-toolbar> -->
    <v-card-title class="flex-grow-1">
      <span class="headline">Thông tin phiếu nhập {{ getImportProductId }}</span>
    </v-card-title>
    <!-- </v-toolbar> -->
    <v-card-text>
      <v-row>
        <v-col cols="12" md="3" class="py-0">Ngày nhập: 2019/09/20</v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3" class="py-0">Người nhận: Dương Thoa</v-col>
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
            <th class="text-center" style="width:40%; font-size: 1rem;">
              Tên sản phẩm
            </th>
            <th class="text-center" style="width:10%; font-size: 1rem;">
              Số lượng
            </th>
            <th class="text-center" style="width:15%; font-size: 1rem;">
              Giá nhập
            </th>
            <th class="text-center" style="width:15%; font-size: 1rem;">
              Thành tiền
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in listProducts" :key="product.id">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ product.id }}</td>
            <td class="text-left">{{ product.title }}</td>
            <td class="text-center">{{ product.quantity }}</td>
            <td class="text-center">{{ formatCurrency(price(product)) }}đ</td>
            <td class="text-center">{{ formatCurrency(product.quantity * price(product)) }}đ</td>
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
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { formatCurrency } from "@/_api/format-currency";
export default {
  data() {
    return {
      // ImportProduct: { id, listProducts: []}
    };
  },
  computed: {
    ...mapState({
      products: state => state.products.allProducts
    }),
    listProducts() {
      // listProducts = this.ImportProduct.listProducts
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
    getImportProductId() {
      const importProductId = this.$route.params.importProductId;
      return importProductId;
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
    // this.ImportProduct = data
  }
};
</script>
