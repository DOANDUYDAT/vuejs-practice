<template>
  <div>
    <v-card flat>
      <v-toolbar color="primary" dark flat>
        <v-card-title>
          <span class="headline">Thêm sản phẩm</span>
        </v-card-title>
      </v-toolbar>
      <v-row>
        <v-col cols="8">
          <ValidationObserver ref="observer" v-slot="{ invalid }" tag="div">
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-subheader class="text-size">Thương hiệu</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                name="supplier"
                rules="required"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-select
                  :items="listSelected"
                  placeholder="Thương hiệu"
                  v-model="supplierId"
                  outlined
                  hide-details
                ></v-select>
                <!-- <v-text-field
                  :placeholder="item.text"
                  outlined
                  v-model="product[item.model]"
                  hide-details
                ></v-text-field> -->
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row justify="center" v-for="item in items" :key="item.text">
            <v-col cols="12" md="3">
              <v-subheader class="text-size">{{ item.text }}</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                :name="item.model"
                rules="required"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field
                  :placeholder="item.text"
                  outlined
                  :type="item.type"
                  v-model="product[item.model]"
                  hide-details
                ></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          </ValidationObserver>
        </v-col>
        <v-col cols="4">
          <div class="my-avatar">
            <!-- <v-row justify="center">
            <v-col>-->
            <div v-if="product.images.length > 0">
              <v-avatar
                v-for="(image, i) in product.images"
                class="profile ma-1"
                color="grey"
                size="164"
                tile
                :key="i"
              >
                <v-img :src="image"></v-img>
              </v-avatar>
            </div>
            <!-- </v-col>
            </v-row>-->
          </div>
          <!-- <input type="file" ref="file" accept="image/*" v-on:change="handleFileUpload()"/> -->
          <v-file-input
            multiple
            show-size
            prepend-icon="mdi-camera"
            @change="handleFileUpload"
            accept="image/*"
            full-width
            label="Thêm ảnh"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8">
          <vue-editor v-model="product.description"></vue-editor>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-row>
          <v-btn color="gg-red" class="mx-auto white--text" @click="submit"
            >Submit</v-btn
          >
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { productService } from "@/_api";
import { supplierService } from "@/_api";

export default {
  components: {
    VueEditor
  },

  data() {
    return {
      suppliers: [],
      supplierId: "",
      product: {
        guarantee: "",
        guaranteeDes: "",
        name: "",
        color: "",
        screen: "",
        resolution: "",
        rearCamera: "",
        frontCamera: "",
        chip: "",
        ram: "",
        rom: "",
        pin: "",
        operatingSystem: "",
        chargingPort: "",
        sim: "",
        retailPrice: 0,
        listedPrice: 0,
        promotionalPrice: 0,
        count: 0,
        description: "<h1>Some initial content</h1>",
        images: []
      },
      items: [
        {
          text: "Bảo hành",
          model: "guarantee",
          type: ""
        },
        {
          text: "Mô tả bảo hành",
          model: "guaranteeDes",
          type: ""
        },
        {
          text: "Tên",
          model: "name",
          type: ""
        },
        {
          text: "Màu sắc",
          model: "color",
          type: ""
        },
        {
          text: "Màn hình",
          model: "screen",
          type: ""
        },
        {
          text: "Độ phân giải",
          model: "resolution",
          type: ""
        },
        {
          text: "Camera sau",
          model: "rearCamera",
          type: ""
        },
        {
          text: "Camera trước",
          model: "frontCamera",
          type: ""
        },
        {
          text: "Chip",
          model: "chip",
          type: ""
        },
        {
          text: "RAM",
          model: "ram",
          type: ""
        },
        {
          text: "Bộ nhớ trong",
          model: "rom",
          type: ""
        },
        {
          text: "Pin",
          model: "pin",
          type: ""
        },
        {
          text: "Hệ điều hành",
          model: "operatingSystem",
          type: ""
        },
        {
          text: "Cổng sạc",
          model: "chargingPort",
          type: ""
        },
        {
          text: "Loại sim",
          model: "sim",
          type: ""
        },
        {
          text: "Giá bán lẻ",
          model: "retailPrice",
          type: ""
        },
        {
          text: "Giá niêm yết",
          model: "listedPrice",
          type: ""
        },
        {
          text: "Giá khuyến mại",
          model: "promotionalPrice",
          type: ""
        },
        {
          text: "Số lượng",
          model: "count",
          type: ""
        }
      ]
    };
  },
  computed: {
    listSelected() {
      const suppliers = this.suppliers;
      let listSelected = [];
      if (suppliers.length > 0) {
        listSelected = suppliers.map(e => {
          return {
            text: e.name,
            value: e.id
          }
        })
      }
      return listSelected;
    }
  },
  methods: {
    async submit() {
      const product = {...this.product, supplierId: this.supplierId};
      try {
        const isSuccess = await productService.createProduct(product);
        if (isSuccess) {
          this.$refs.observer.reset();
          this.$store.dispatch("alert/success", {
            message: "Add Successfully!"
          });
          this.resetInput();
        }
      } catch (error) {
        this.$store.dispatch("alert/error", {
          message: error
        });
      }
    },
    handleFileUpload(files) {
      this.product.images = [];
      for (let i = 0; i < files.length; i++) {
        let reader = new FileReader();
        reader.onload = function() {
          this.product.images.push(reader.result);
        }.bind(this);
        reader.readAsDataURL(files[i]);
      }
    },
    resetInput() {
      this.product.supplier = "";
      this.product.guarantee = "";
      this.product.guaranteeDes = "";
      this.product.name = "";
      this.product.color = "";
      this.product.screen = "";
      this.product.resolution = "";
      this.product.rearCamera = "";
      this.product.frontCamera = "";
      this.product.chip = "";
      this.product.ram = "";
      this.product.rom = "";
      this.product.pin = "";
      this.product.operatingSystem = "";
      this.product.chargingPort = "";
      this.product.sim = "";
      this.product.retailPrice = 0;
      this.product.listedPrice = 0;
      this.product.promotionalPrice = 0;
      this.product.count = 0;
      this.product.description = "<h1>Some initial content</h1>";
      this.product.images = [];
    },
    async getData() {
      this.suppliers = await supplierService.getAllSuppliers();
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
.text-size {
  font-size: 1rem;
}
</style>
