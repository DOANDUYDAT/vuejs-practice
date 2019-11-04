<template>
  <v-col>
    <v-row>
      <v-col cols="12">
        <h2>{{ product.title }}</h2>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <template v-if="product.gia_khuyen_mai">
      <v-row>
        <v-col cols="3">Giá niêm yết</v-col>
        <v-col cols="9">{{ price }}đ</v-col>
      </v-row>
      <v-row>
        <v-col cols="3">Giá khuyến mãi</v-col>
        <v-col cols="9">{{ salePrice }}đ</v-col>
      </v-row>
    </template>
    <v-row v-else>
      <v-col cols="3">Giá bán lẻ</v-col>
      <v-col cols="9">{{ oldPrice }}đ</v-col>
    </v-row>
    <v-row>
      <v-col cols="3">Khuyến mãi</v-col>
      <v-col cols="9"></v-col>
    </v-row>
    <v-row>
      <v-col cols="3">Vận chuyển</v-col>
      <v-col cols="9"></v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row align="center">
      <v-col cols="3">Chọn số lượng</v-col>
      <v-col cols="9">
        <v-btn-toggle dense>
          <v-btn
            :disabled="quantity > 1 ? false : true"
            @click="decrementItemQuantity()"
            min-width="2rem"
          >
            <span>-</span>
          </v-btn>
          <v-btn disabled min-width="2rem">
            <span>{{ quantity > 1 ? quantity : 1 }}</span>
          </v-btn>
          <v-btn @click="incrementItemQuantity()" min-width="2rem">
            <span>+</span>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" >
      <v-btn color="red" dark>mua ngay</v-btn>

      </v-col>
      <v-col cols="8">
      <v-btn outlined color="red">
        <v-icon>mdi-cart-plus</v-icon>Thêm vào giỏ hàng
      </v-btn>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { formatCurrency } from "../_api/format-currency";

export default {
  data() {
    return {
      quantity: 1
    };
  },
  props: {
    product: {}
  },
  computed: {
    oldPrice() {
      let oldPrice = "";
      if (this.product.gia_ban_le !== undefined) {
        oldPrice = formatCurrency(this.product.gia_ban_le);
      }
      return oldPrice;
    },
    price() {
      let price = "";
      if (this.product.gia_niem_yet !== undefined) {
        price = formatCurrency(this.product.gia_niem_yet);
      }
      return price;
    },
    salePrice() {
      let salePrice = "";
      if (this.product.gia_khuyen_mai !== undefined) {
        salePrice = formatCurrency(this.product.gia_khuyen_mai);
      }
      return salePrice;
    }
  },
  methods: {
    incrementItemQuantity() {
      this.quantity++;
    },
    decrementItemQuantity() {
      this.quantity--;
    }
  }
};
</script>