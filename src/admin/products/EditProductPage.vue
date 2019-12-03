<template>
  
    <v-card flat>
      <v-toolbar color="primary" dark flat>
        <v-card-title>
          <span class="headline">Chi tiết sản phẩm {{ getProductId }}</span>
        </v-card-title>
      </v-toolbar>
      <v-row>
        <v-col cols="8">
          <v-row justify="center" v-for="item in items" :key="item.text">
            <v-col cols="12" md="3">
              <v-subheader class="text-size">{{ item.text }}</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                :name="item.model"
                rules="required|alpha"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field :placeholder="item.text" outlined v-model="product[item.model]" hide-details :disabled="disabled"></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4">
          <div class="my-avatar">
            <!-- <v-row justify="center">
            <v-col>-->
            <div v-if="images" class="px-5">
              <v-avatar
                v-for="(image, i) in images"
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
        <v-col cols="8" class="text-editor">
          <vue-editor v-model="content" ></vue-editor>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-row v-if="disabled">
          <v-btn color="gg-red" class="mx-auto white--text" @click="disabled = !disabled">Chỉnh sửa</v-btn>
        </v-row>
        <v-row v-else justify="center">
          <v-btn color="gg-red" outlined class="mx-3 px-2 epp-btn" @click="disabled = !disabled">Quay lại</v-btn>
          <v-btn color="gg-red" class="mx-3 px-2 epp-btn white--text" @click="submit">Lưu</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>

</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },

  data() {
    return {
      disabled: true,
      images: [],
      content: "<h1>Some initial content</h1>",
      product: {
        supplier: "",
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
        sim: ""
      },
      items: [
        {
          text: "Thương hiệu",
          model: "supplier",
        },
        {
          text: "Bảo hành",
          model: "guarantee",
        },
        {
          text: "Mô tả bảo hành",
          model: "guaranteeDes",
        },
        {
          text: "Tên",
          model: "name",
        },
        {
          text: "Màu sắc",
          model: "color",
        },
        {
          text: "Màn hình",
          model: "screen",
        },
        {
          text: "Độ phân giải",
          model: "resolution",
        },
        {
          text: "Camera sau",
          model: "rearCamera",
        },
        {
          text: "Camera trước",
          model: "frontCamera",
        },
        {
          text: "Chip",
          model: "chip",
        },
        {
          text: "RAM",
          model: "ram",
        },
        {
          text: "Bộ nhớ trong",
          model: "rom",
        },
        {
          text: "Pin",
          model: "pin",
        },
        {
          text: "Hệ điều hành",
          model: "operatingSystem",
        },
        {
          text: "Cổng sạc",
          model: "chargingPort",
        },
        {
          text: "Loại sim",
          model: "sim",
        }
      ]
    };
  },

  computed: {
    getProductId() {
      const productId = this.$route.params.productId;
      return productId;
    }
  },

  methods: {
    submit() {
      console.log(this.content);
    },
    handleFileUpload(files) {
      this.images = [];
      for (let i = 0; i < files.length; i++) {
        let reader = new FileReader();
        reader.onload = function() {
          this.images.push(reader.result);
        }.bind(this);
        reader.readAsDataURL(files[i]);
      }
    }
  }
};
</script>

<style scoped>
.text-size {
  font-size: 1rem;
}
.epp-btn {
  width: 6rem;
}
.text-editor {
    padding-left: 32px;
    
}
</style>

