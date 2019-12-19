<template>
  <v-container class="mx-auto">
    <div class="headline">Thông số kỹ thuật</div>

    <v-row>
      <v-col cols="12">
        <b>Thông tin chung</b>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="5">Thương hiệu</v-col>
      <v-col cols="7">{{ product.supplier }}</v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="5">Bảo hành</v-col>
      <v-col cols="7">{{ product.guarantee }}</v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="5">Mô tả bảo hành</v-col>
      <v-col cols="7">{{ product.guaranteeDes }}</v-col>
    </v-row>
    <v-divider></v-divider>

    <v-row>
      <v-col cols="5">Tên</v-col>
      <v-col cols="7">{{ product.name }}</v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="5">Màu sắc</v-col>
      <v-col cols="7">{{ product.color }}</v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <b>Màn hình</b>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="5">Loại màn hình</v-col>
      <v-col cols="7">{{ product.screen }}</v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="5">Độ phân giải</v-col>
      <v-col cols="7">{{ product.resolution }}</v-col>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="600">
        <template v-slot:activator="{ on }">
          <v-btn small v-on="on">Xem đầy đủ</v-btn>
        </template>
        <v-card tile class="spec-product">
          <v-toolbar flat>
            <v-toolbar-title class="flex-grow-1 text-center headline">Thông số kỹ thuật</v-toolbar-title>
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left font-weight-black">Thông tin chung</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Thương hiệu</td>
                    <td>{{ product.supplier }}</td>
                  </tr>
                  <tr>
                    <td>Bảo hành</td>
                    <td>{{ product.guarantee }}</td>
                  </tr>
                  <tr>
                    <td>Mô tả bảo hành</td>
                    <td>{{ product.guaranteeDes }}</td>
                  </tr>
                  <tr>
                    <td>Tên</td>
                    <td>{{ product.name }}</td>
                  </tr>
                  <tr>
                    <td>Màu sắc</td>
                    <td>{{ product.color }}</td>
                  </tr>
                </tbody>
                <thead>
                  <tr>
                    <th class="text-left font-weight-black">Màn hình</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Loại màn hình</td>
                    <td>{{ product.screen }}</td>
                  </tr>
                  <tr>
                    <td>Độ phân giải</td>
                    <td>{{ product.resolution }}</td>
                  </tr>
                </tbody>
                <thead>
                  <tr>
                    <th class="text-left font-weight-black">Camera</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Camera sau</td>
                    <td>{{ product.backCamera }}</td>
                  </tr>
                  <tr>
                    <td>Camera trước</td>
                    <td>{{ product.frontCamera }}</td>
                  </tr>
                </tbody>
                <thead>
                  <tr>
                    <th class="text-left font-weight-black">Cấu hình</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Chip</td>
                    <td>{{ product.chip }}</td>
                  </tr>
                  <tr>
                    <td>RAM</td>
                    <td>{{ product.ram }}</td>
                  </tr>
                  <tr>
                    <td>Bộ nhớ trong</td>
                    <td>{{ product.rom }}</td>
                  </tr>
                  <tr>
                    <td>Pin</td>
                    <td>{{ product.pin }}</td>
                  </tr>
                  <tr>
                    <td>Hệ điều hành</td>
                    <td>{{ product.operatingSystem }}</td>
                  </tr>
                  <tr>
                    <td>Cổng sạc</td>
                    <td>{{ product.chargingPort }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false
    };
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {

  }
};
</script>

<style lang="scss" scoped>
@import "@/variables.scss";
.container {
  background-color: $it-bg-in;
}
</style>
