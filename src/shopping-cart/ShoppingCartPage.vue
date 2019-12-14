
<template>
  <v-container v-if="numberProduct > 0">
    <v-row justify="center">
      <v-col cols="10">
        <v-card color="white">
          <v-simple-table class="table table-hover table-sm">
            <thead>
              <tr>
                <th class="text-center" style="width:25%">
                  <b>HÌNH ẢNH</b>
                </th>
                <th class="text-center" style="width:35%">
                  <b>TÊN SẢN PHẨM</b>
                </th>
                <th class="text-center" style="width:20%">
                  <b>SỐ LƯỢNG</b>
                </th>
                <th class="text-center" style="width:15%">
                  <b>ĐƠN GIÁ</b>
                </th>
                <th class="text-center" style="width:10%"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td class="text-center mx-auto">
                  <v-img class="mx-auto" max-width="150px" max-height="200px" :src="product.image"></v-img>
                </td>
                <td class="text-center">{{ product.name }}</td>

                <td class="text-center">
                  <v-card flat class="py-12">
                    <v-card-text style="padding-top: 0px">
                      <v-row align="center" justify="center">
                        <v-col cols="10"></v-col>
                        <v-btn-toggle dense>
                          <v-btn
                            :disabled="product.quantity > 1 ? false : true"
                            @click="decrementItemQuantity({ id: product.id, quantity: 1 })"
                            min-width="2rem"
                          >
                            <span>-</span>
                          </v-btn>
                          <v-btn disabled min-width="2rem">
                            <span>{{ product.quantity > 1 ? product.quantity : 1 }}</span>
                          </v-btn>
                          <v-btn
                            @click="incrementItemQuantity({ id: product.id, quantity: 1 })"
                            min-width="2rem"
                          >
                            <span>+</span>
                          </v-btn>
                        </v-btn-toggle>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </td>
                <td class="text-center">{{ formatCurrency(product.price) }}đ</td>
                <td class="text-center">
                  <v-btn text color="red" @click="removeProductFromCart({ id: product.id })">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <td></td>
              <td></td>

              <td class="text-center">
                <v-card-text class="mx-auto color:white">
                  <b>Tổng tiền:</b>
                </v-card-text>
              </td>
              <td class="text-center">
                <span style="color: red" data-tongtien>{{ formatCurrency(total) }}đ</span>
              </td>
            </tfoot>
          </v-simple-table>
          <v-col class="mx-auto pt-0 px-0 mx-auto pt-0">
            <v-card-actions>
              <v-btn
                color="red"
                tile
                dark
                class="mx-auto"
                :disabled="!products.length"
                to="/order-page"
                exact
              >Đặt hàng</v-btn>
            </v-card-actions>
            <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
          </v-col>

          <!-- <v-card-text style="color:white">
        <v-row class="mx-auto pt-0 mdi-format-float-center">
          <v-col class="mx-auto pt-0 px-0 mx-auto pt-0 mdi-format-float-center"></v-col>
          <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
        </v-row>
          </v-card-text>-->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-card v-else flat height="100%" class="pt-10">
    <v-img
      class="white--text mx-auto"
      max-width="300"
      max-height="300"
      :src="require('@/_assets/image/empty-cart-big.png')"
    ></v-img>
    <v-card-text class="text-center">
      <v-btn color="gg-red" tile dark to="/home">Quay lại trang chủ</v-btn>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import { formatCurrency } from "../_api/format-currency";

export default {
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    ...mapState({
      checkoutStatus: state => state.cart.checkoutStatus
    }),
    ...mapGetters("cart", {
      products: "cartProducts",
      total: "cartTotalPrice"
    }),
    numberProduct: function() {
      let numberProduct = 0;
      this.products.forEach(product => {
        numberProduct += product.quantity;
      });
      return numberProduct;
    }
  },
  methods: {
    ...mapMutations("cart", [
      "incrementItemQuantity",
      "decrementItemQuantity",
      "removeProductFromCart"
    ]),

    formatCurrency(total) {
      return formatCurrency(total);
    }
  }
};
</script>

