<template>
  <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
    <v-list>
      <template v-for="item in items">
        <v-list-group :key="item.text">
          <template v-slot:activator>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </template>
          <v-list-item v-for="(child, i) in item.children" :key="i" :to="child.link">
            <v-list-item-content>{{ child.text }}</v-list-item-content>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      items: [
        {
          text: "Quản lý người dùng",
          children: [
            {
              text: "Danh sách người dùng",
              link: '/admin/users'
            }
          ]
        },
        {
          text: "Quản lý sản phẩm",
          children: [
            {
              text: "Danh sách sản phẩm",
              link: '/admin/products'
            },
            {
              text: "Thêm sản phẩm",
              link: '/admin/add-product'
            }
          ]
        },
        {
          text: "Quản lý đơn hàng",
          children: [
            {
              text: "Danh sách đơn hàng",
              link: '/admin/orders'
            }
          ]
        },
        {
          text: "Quản lý nhà cung cấp",
          children: [
            {
              text: "Danh sách nhà cung cấp",
              link: '/admin/suppliers'
            },
            {
              text: "Thêm nhà cung cấp",
              link: '/admin/suppliers'
            }
          ]
        },
        {
          text: "Quản lý nhập xuất",
          children: [
            {
              text: "Danh sách nhà cung cấp",
              link: '/admin/suppliers'
            },
            {
              text: "Thêm nhà cung cấp",
              link: '/admin/suppliers'
            }
          ]
        },
        {
          text: "Thống kê thu chi",
          children: [
            {
              text: "Thoa thống kê",
              link: '/admin/suppliers'
            },
            {
              text: "Thành thống kê",
              link: '/admin/suppliers'
            }
          ]
        }
      ]
    };
  }
};
</script>