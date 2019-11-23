<template>
  <div class="text-center">
    <v-menu
      open-on-hover
      bottom
      offset-y
      class="color:white mx-auto center"
      style="background-color: white"
    >
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

      <v-responsive
        class="mx-auto"
        max-width="450px"
        style="background-color: white"
      >
        <!-- <v-toolbar color="primary" style="width=300px" class="mx-auto color:white">
          <v-card-title class="layout justify-center; mx-auto" style="color: white">
            <span class="mx-auto">GIỎ HÀNG CỦA BẠN</span>
          </v-card-title>
        </v-toolbar>-->

        <v-simple-table class="table table-hover table-sm">
          <thead>
            <tr>
              <th class="text-center" style="width:30%"></th>
              <th class="text-center" style="width:50%"></th>
              <th class="text-center" style="width:20%"></th>
              <!-- <th class="text-center" style="width:15%"></th>
              <th class="text-center" style="width:5%"></th>-->
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td class="center">
                <v-card max-width="100px" max-height="100px">
                  <v-img :src="product.image"></v-img>
                </v-card>
              </td>
              <td class="text-center">
                {{ product.title }}
                <br />
                <b>x{{ product.quantity }}</b>
              </td>

              <!-- <td class="text-center">
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
              </td>-->
              <td class="text-end">{{ formatCurrency(product.price) }}đ</td>
              <!-- <td class="text-center">
                    <v-btn text color="red" @click="removeProductFromCart({ id: product.id })">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
              </td>-->
            </tr>
          </tbody>
          <tfoot>
            <!-- <td></td> -->
            <td colspan="2" class="text-end">
              <v-card-text class="mx-auto color:white">
                <label>
                  <b>Tổng tiền:</b>
                </label>
              </v-card-text>
            </td>
            <td class="text-end">
              <span style="color: red" data-tongtien>{{ total }}đ</span>
            </td>
          </tfoot>
        </v-simple-table>

        <v-card-text style="color:white">
          <v-row class="mx-auto pt-0 mdi-format-float-center">
            <v-col
              class="mx-auto pt-0 px-0 mx-auto pt-0 mdi-format-float-center"
            >
              <v-card-actions>
                <v-btn
                  color="red"
                  class="ma-2"
                  outlined
                  :disabled="!products.length"
                  @click="xemchitietdonhang()"
                  >Xem chi tiết</v-btn
                >
              </v-card-actions>
            </v-col>
            <v-col
              class="mx-auto pt-0 px-0 mx-auto pt-0 mdi-format-float-center"
            >
              <v-card-actions>
                <v-btn
                  color="red"
                  tile
                  dark
                  class="ma-2"
                  :disabled="!products.length"
                  @click="checkout(products)"
                  >Đặt hàng ngay</v-btn
                >
              </v-card-actions>
              <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-responsive>
    </v-menu>
  </div>
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
    checkout(products) {
      this.$store.dispatch("cart/checkout", products);
    },

    ...mapMutations("cart", [
      "incrementItemQuantity",
      "decrementItemQuantity",
      "removeProductFromCart"
    ]),
    formatCurrency(price) {
      return formatCurrency(price);
    }
  }
};
</script>

<style scoped>
v-btn-tpggle v-btn {
  min-width: 2rem;
}
</style>
