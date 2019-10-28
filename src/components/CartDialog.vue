<template>
  <v-dialog v-model="dialog" max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-cart-plus</v-icon>
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
                  <th class="text-center" style="width:15%">ĐƠN GIÁ</th>
                  <th class="text-center" style="width:15%">SỐ LƯỢNG</th>
                  <th class="text-center" style="width:10%"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in items" :key="item.id">
                  <td class="text-center">
                    <v-card max-width="150px" max-height="150px">
                      <v-img :src="item.image"></v-img>
                    </v-card>
                  </td>
                  <td class="text-center">{{ item.title }}</td>
                  <td class="text-center">{{ item.price }}</td>
                  <td class="text-center">
                    <v-card flat class="py-12">
                      <v-card-text style="padding-top: 0px">
                        <v-row align="center" justify="center">
                          <v-col cols="10"></v-col>
                          <v-btn-toggle v-model="toggle" mandatory>
                            <v-btn>
                              <span>-</span>
                            </v-btn>
                            <v-btn>
                              <span>1</span>
                            </v-btn>
                            <v-btn>
                              <span>+</span>
                            </v-btn>
                          </v-btn-toggle>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </td>
                  <td class="text-center">
                    <v-btn text color="red">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
              <tfoot align="right">
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <v-card-text class="mx-auto">
                    <label>
                      <b>Tổng hóa đơn:</b>
                    </label>
                  </v-card-text>
                </td>
                <td>
                  <span style="color: red" data-tongtien>
                    {{}}
                    <sup>đ</sup>
                  </span>
                </td>
              </tfoot>
            </v-simple-table>

            <v-row class="mx-auto pt-0 float-right">
              <v-col cols="12" md="7" class="mx-auto pt-0 px-0">
                <v-card-actions>
                  <v-btn color="primary" class="layout justify-center">Tiếp tục mua sắm</v-btn>
                </v-card-actions>
              </v-col>
              <v-col cols="12" md="5" class="mx-auto pt-0 px-0">
                <v-card-actions>
                  <v-btn color="primary" class="layout justify-center">Đặt hàng</v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </v-responsive>
    </v-card>
  </v-dialog>
</template>
  <script>
export default {
  data() {
    return {
      dialog: false,
      toggle: false,
      items: [
        {
          image: require("../image/m20.jpg"),
          title: "Sam Sung Galaxy M20",
          price: 5000000,
          quantity: 1
        },
        {
          image: require("../image/j7.jpg"),
          title: "Sam Sung Galaxy J7 Prime",
          price: 4000000,
          quantity: 1
        }
      ]
    };
  }
};
</script>
