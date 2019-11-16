import Vue from "vue";
import VueRouter from "vue-router";

import HelloWorld from "@/components/HelloWorld.vue";
import HomePage from "@/home/HomePage";
import ShoppingCartPage from "@/cart/ShoppingCartPage";
import ProductDetailPage from "@/product-detail/ProductDetailPage";
import AccountPage from "@/account/AccountPage";
import ProfilePage from "@/profile/ProfilePage";
import ChangePasswordPage from "@/change-password/ChangePasswordPage";
import HistoryPage from "@/history/HistoryPage";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/home",
      name: "Home",
      component: HomePage,
      alias: "/"
    },
    {
      path: "/todo",
      component: HelloWorld,
      children: [
        {
          path: "profile",
          component: ProfilePage,
          alias: ""
        },
        {
          path: "change",
          component: ChangePasswordPage
        },
        {
          path: "history",
          component: HistoryPage
        }
      ]
    },
    {
      path: "/shopping-cart-page",
      component: ShoppingCartPage
    },
    {
      path: "/product-detail-page",
      component: ProductDetailPage
    },
    {
      path: "/account",
      component: AccountPage,
      children: [
        {
          path: "profile",
          component: ProfilePage,
          alias: ""
        },
        {
          path: "change-password",
          component: ChangePasswordPage
        },
        {
          path: "history",
          component: HistoryPage
        }
      ]
    }
  ]
});
