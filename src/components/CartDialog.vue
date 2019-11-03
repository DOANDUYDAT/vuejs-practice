<template>
  <v-dialog v-model="dialog" max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon>
        <v-badge overlap color="red">
          <template v-slot:badge>
            <span v-if="numberProduct > 0">{{ numberProduct }}</span>
          </template>

          <v-icon>mdi-cart-plus</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-card flat class="mx-auto">
      <v-responsive :aspect-ratio="16/9" class="mx-auto">
        <v-toolbar color="primary" style="width=500px" class="mx-auto">
          <v-card-title class="layout justify-center; mx-auto" style="color: white">
            <span class="mx-auto">GIỎ HÀNG CỦA BẠN</span>
          </v-card-title>
        </v-toolbar>
        <v-card-text>
          <div class="container table-responsive">
            <v-simple-table class="table table-hover table-sm">
              <thead>
                <tr>
                  <th class="text-center" style="width:20%">HÌNH ẢNH</th>
                  <th class="text-center" style="width:40%">TÊN SẢN PHẨM</th>

                  <th class="text-center" style="width:20%">SỐ LƯỢNG</th>
                  <th class="text-center" style="width:15%">ĐƠN GIÁ</th>
                  <th class="text-center" style="width:5%"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in products" :key="product.id">
                  <td class="text-center">
                    <v-card max-width="150px" max-height="150px">
                      <v-img :src="product.image"></v-img>
                    </v-card>
                  </td>
                  <td class="text-center">{{ product.title }}</td>
                  

                  <td class="text-center">
                    <v-card flat class="py-12">
                      <v-card-text style="padding-top: 0px">
                        <v-row align="center" justify="center">
                          <v-col cols="10"></v-col>
                          <v-btn-toggle dense>
                            <v-btn
                              :disabled="product.quantity > 1 ? false : true"
                              @click="decrementItemQuantity({ id: product.id })"
                              min-width="2rem"
                            >
                              <span>-</span>
                            </v-btn>
                            <v-btn disabled min-width="2rem">
                              <span>{{ product.quantity > 1 ? product.quantity : 1 }}</span>
                            </v-btn>
                            <v-btn
                              @click="incrementItemQuantity({ id: product.id })"
                              min-width="2rem"
                            >
                              <span>+</span>
                            </v-btn>
                          </v-btn-toggle>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </td>
                  <td class="text-end">{{ formatCurrency(product.price) }}đ</td>
                  <td class="text-center">
                    <v-btn text color="red" @click="removeProductFromCart({ id: product.id })">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <!-- <td></td> -->

                <td colspan="3" class="text-end">
                  <v-card-text class="mx-auto">
                    <label>
                      <b>Tổng hóa đơn:</b>
                    </label>
                  </v-card-text>
                </td>
                <td class="text-end">
                  <span style="color: red" data-tongtien>{{ total }}đ</span>
                </td>
              </tfoot>
            </v-simple-table>

            <!-- <v-row class="mx-auto pt-0 float-right">
              <v-col cols="12" md="7" class="mx-auto pt-0 px-0">
                <v-card-actions>
                  <v-btn color="primary" class="layout justify-center">Tiếp tục mua sắm</v-btn>
                </v-card-actions>
              </v-col>
              <v-col cols="12" md="5" class="mx-auto pt-0 px-0">
                <v-card-actions>
                  <v-btn
                    color="primary"
                    class="layout justify-center"
                    :disabled="!products.length"
                    @click="checkout(products)"
                  >Đặt hàng</v-btn>
                </v-card-actions>
                <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
              </v-col>
            </v-row>-->
          </div>
        </v-card-text>
        <v-row class="mx-auto pt-0 float-right">
          <!-- <v-col cols="12" md="7" class="mx-auto pt-0 px-0">
            <v-card-actions>
              <v-btn color="primary" class="layout justify-center">Tiếp tục mua sắm</v-btn>
            </v-card-actions>
          </v-col> -->
          <v-col  class="mx-auto pt-0 px-0">
            <v-card-actions>
              <v-btn
                color="primary"
                class="layout justify-center"
                :disabled="!products.length"
                @click="checkout(products)"
              >Đặt hàng</v-btn>
            </v-card-actions>
            <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
          </v-col>
        </v-row>
      </v-responsive>
    </v-card>
  </v-dialog>
</template>
  <script>
import { mapGetters, mapState, mapMutations } from "vuex";
import { formatCurrency } from '../_api/format-currency';

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
    },
  },
  methods: {
    checkout(products) {
      this.$store.dispatch("cart/checkout", products);
    },
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


<style scoped>
v-btn-tpggle v-btn {
  min-width: 2rem;
}
</style>