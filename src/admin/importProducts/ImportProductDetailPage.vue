<template>
  <v-card>
    <!-- <v-toolbar> -->
    <v-card-title class="flex-grow-1">
      <span class="headline">Thông tin phiếu nhập {{ anImport.id }}</span>
    </v-card-title>
    <!-- </v-toolbar> -->
    <v-card-text>
      <v-row>
        <v-col cols="12" md="3" class="py-0"
          >Ngày nhập: {{ anImport.createdAt }}</v-col
        >
      </v-row>
      <v-row>
        <v-col cols="12" md="3" class="py-0">Người nhập: {{ nameStaff }}</v-col>
      </v-row>
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-center" style="width:10%; font-size: 1rem;">
              STT
            </th>
            <th class="text-center" style="width:10%; font-size: 1rem;">
              ID
            </th>
            <th class="text-center" style="width:40%; font-size: 1rem;">
              Tên sản phẩm
            </th>
            <th class="text-center" style="width:10%; font-size: 1rem;">
              Số lượng
            </th>
            <th class="text-center" style="width:15%; font-size: 1rem;">
              Giá nhập
            </th>
            <th class="text-center" style="width:15%; font-size: 1rem;">
              Thành tiền
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in listProducts" :key="product.id">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ product.id }}</td>
            <td class="text-left">{{ product.name }}</td>
            <td class="text-center">{{ product.quantity }}</td>
            <td class="text-center">{{ formatCurrency(product.price) }}đ</td>
            <td class="text-center">
              {{ formatCurrency(product.quantity * product.price) }}đ
            </td>
          </tr>
        </tbody>
        <!-- <v-divider></v-divider> -->
        <tfoot>
          <!-- <td></td> -->
          <tr>
            <td colspan="5" class="text-end">
              <v-card-text class="mx-auto color:white">
                <label>
                  <b>Tổng tiền:</b>
                </label>
              </v-card-text>
            </td>
            <td class="text-center">
              <span style="color: red" data-tongtien
                >{{ formatCurrency(anImport.total) }}đ</span
              >
            </td>
          </tr>
        </tfoot>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { formatCurrency } from "@/_api/format-currency";
import { importProductService } from "@/_api";
export default {
  data() {
    return {
      anImport: {},
      listProducts: []
    };
  },
  computed: {
    nameStaff() {
      return this.anImport.user
        ? this.anImport.user.first_name + " " + this.anImport.user.last_name
        : "";
    }
  },
  methods: {
    formatCurrency(price) {
      return formatCurrency(price);
    },
    async getData() {
      const importId = this.$route.params.importProductId;
      this.anImport = await importProductService.getImport(importId);
      this.listProducts = this.anImport.items.map(e => {
        return {
          id: e.product.id,
          quantity: e.quantity,
          name: "Điện thoại " + e.product.supplier + " " + e.product.name + " " + e.product.rom + " (" + e.product.color + ")",
          price: e.import_price
        };
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>
