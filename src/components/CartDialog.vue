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
        <v-btn v-on="on" icon to='/shopping-cart' exact>
          <v-badge overlap color="gg-red">
            <template v-slot:badge>
              <span v-if="numberProduct > 0">{{ numberProduct }}</span>
            </template>
            <v-icon>mdi-cart-plus</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-responsive class="mx-auto" max-width="450px" style="background-color: white">
        <v-simple-table class="table table-hover table-sm">
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

              <td class="text-end">{{ formatCurrency(product.price) }}đ</td>
            </tr>
          </tbody>
          <tfoot>
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
            <v-col class="mx-auto pt-0 px-0 mx-auto pt-0 mdi-format-float-center">
              <v-card-actions>
                <v-btn
                  color="gg-red"
                  class="ma-2"
                  outlined
                  :disabled="!products.length"
                  @click="cartdetail"
                >Xem chi tiết</v-btn>
              </v-card-actions>
            </v-col>
            <v-col class="mx-auto pt-0 px-0 mx-auto pt-0 mdi-format-float-center">
              <v-card-actions>
                <v-btn
                  color="gg-red"
                  tile
                  dark
                  class="ma-2"
                  :disabled="!products.length"
                  @click="goToOrderPage"
                >Đặt hàng ngay</v-btn>
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
    goToOrderPage() {
      const path = this.$route.path;
      this.dialog = false;
      if (path !== "/order-page") {
        this.$router.push({ name: "order page" });
      }
    },
    cartdetail() {
      const path = this.$route.path;
      this.dialog = false;
      if (path !== "/shopping-cart") {
        this.$router.push({ name: "shopping cart" });
      }
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
