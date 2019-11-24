<template>
  <v-container class="mx-auto">
    <div class="headline">Thông số kỹ thuật</div>
    <v-simple-table v-if="specProduct !== undefined">
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
            <td>{{ specProduct.thong_tin_chung.thuong_hieu }}</td>
          </tr>
          <tr>
            <td>Bảo hành</td>
            <td>{{ specProduct.thong_tin_chung.bao_hanh }}</td>
          </tr>
          <tr>
            <td>Mô tả bảo hành</td>
            <td>{{ specProduct.thong_tin_chung.mo_ta_bao_hanh }}</td>
          </tr>
          <tr>
            <td>Nhóm sản phẩm</td>
            <td>{{ specProduct.thong_tin_chung.nhom_san_pham }}</td>
          </tr>
          <tr>
            <td>Tên</td>
            <td>{{ specProduct.thong_tin_chung.ten }}</td>
          </tr>
          <tr>
            <td>Màu sắc</td>
            <td>{{ specProduct.thong_tin_chung.mau_sac }}</td>
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
            <td>{{ specProduct.man_hinh.loai_man_hinh }}</td>
          </tr>
          <tr>
            <td>Độ phân giải</td>
            <td>{{ specProduct.man_hinh.do_phan_giai }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="600">
        <template v-slot:activator="{ on }">
          <v-btn small  v-on="on">Xem đầy đủ</v-btn>
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
            <v-simple-table v-if="specProduct !== undefined">
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
                    <td>{{ specProduct.thong_tin_chung.thuong_hieu }}</td>
                  </tr>
                  <tr>
                    <td>Bảo hành</td>
                    <td>{{ specProduct.thong_tin_chung.bao_hanh }}</td>
                  </tr>
                  <tr>
                    <td>Mô tả bảo hành</td>
                    <td>{{ specProduct.thong_tin_chung.mo_ta_bao_hanh }}</td>
                  </tr>
                  <tr>
                    <td>Nhóm sản phẩm</td>
                    <td>{{ specProduct.thong_tin_chung.nhom_san_pham }}</td>
                  </tr>
                  <tr>
                    <td>Tên</td>
                    <td>{{ specProduct.thong_tin_chung.ten }}</td>
                  </tr>
                  <tr>
                    <td>Màu sắc</td>
                    <td>{{ specProduct.thong_tin_chung.mau_sac }}</td>
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
                    <td>{{ specProduct.man_hinh.loai_man_hinh }}</td>
                  </tr>
                  <tr>
                    <td>Độ phân giải</td>
                    <td>{{ specProduct.man_hinh.do_phan_giai }}</td>
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
                    <td>{{ specProduct.camera.camera_sau }}</td>
                  </tr>
                  <tr>
                    <td>Camera trước</td>
                    <td>{{ specProduct.camera.camera_truoc }}</td>
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
                    <td>{{ specProduct.cau_hinh.chip }}</td>
                  </tr>
                  <tr>
                    <td>RAM</td>
                    <td>{{ specProduct.cau_hinh.ram }}</td>
                  </tr>
                  <tr>
                    <td>Bộ nhớ trong</td>
                    <td>{{ specProduct.cau_hinh.bo_nho_trong }}</td>
                  </tr>
                  <tr>
                    <td>Pin</td>
                    <td>{{ specProduct.cau_hinh.pin }}</td>
                  </tr>
                  <tr>
                    <td>Hệ điều hành</td>
                    <td>{{ specProduct.cau_hinh.he_dieu_hanh }}</td>
                  </tr>
                  <tr>
                    <td>Cổng sạc</td>
                    <td>{{ specProduct.cau_hinh.cong_sac }}</td>
                  </tr>
                  <tr>
                    <td>Loại sim</td>
                    <td>{{ specProduct.cau_hinh.loai_sim }}</td>
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
    specProduct() {
      return this.product.thong_so_ky_thuat;
    }
  },
  mounted() {
    console.log('SpecProductTable mounted');
  },
  updated() {
    console.log('SpecProductTable updated');
  }
};
</script>

<style lang="scss" scoped>
@import '@/style.scss';
.container {
  background-color: $background-child;
}
</style>