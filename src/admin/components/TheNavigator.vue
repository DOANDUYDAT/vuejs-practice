<template>
  <v-navigation-drawer
    v-model="drawer"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
  >
    <v-list>
      <template v-for="item in items">
        <v-list-group :key="item.text">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            :to="child.link"
          >
            <v-list-item-content>{{ child.text }}</v-list-item-content>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("navigator", ["drawerStatus"]),
    drawer: {
      get() {
        return this.drawerStatus;
      },
      set(value) {
        this.$store.dispatch("navigator/changeDrawer", { value: value });
      }
    }
  },
  data() {
    return {
      items: [
        {
          text: "Quản lý nhóm",
          icon: "mdi-account-group",
          children: [
            {
              text: "Danh sách nhóm",
              link: "/admin/groups"
            }
          ]
        },
        {
          text: "Quản lý người dùng",
          icon: "mdi-account",
          children: [
            {
              text: "Danh sách người dùng",
              link: "/admin/users"
            }
          ]
        },
        {
          text: "Quản lý nhân viên",
          icon: "mdi-account-multiple",
          children: [
            {
              text: "Danh sách nhân viên",
              link: "/admin/staffs"
            },
            {
              text: "Thêm nhân viên",
              link: "/admin/add-staff"
            }
          ]
        },
        {
          text: "Quản lý sản phẩm",
          icon: "mdi-cube",
          children: [
            {
              text: "Danh sách sản phẩm",
              link: "/admin/products"
            },
            {
              text: "Thêm sản phẩm",
              link: "/admin/add-product"
            }
          ]
        },
        {
          text: "Quản lý đơn hàng",
          icon: "mdi-file",
          children: [
            {
              text: "Danh sách đơn hàng",
              link: "/admin/orders"
            }
          ]
        },
        {
          text: "Quản lý nhà cung cấp",
          icon: "mdi-home-group",
          children: [
            {
              text: "Danh sách nhà cung cấp",
              link: "/admin/suppliers"
            }
          ]
        },
        {
          text: "Quản lý nhập kho",
          icon: "mdi-exit-to-app",
          children: [
            {
              text: "Danh sách phiếu nhập",
              link: "/admin/import-products"
            }
          ]
        },
        {
          text: "Thống kê thu chi",
          icon: "mdi-poll-box",
          children: [
            {
              text: "Biểu đồ thống kê",
              link: "/admin/statistic"
            }
          ]
        }
      ]
    };
  }
};
</script>
