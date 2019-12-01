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
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-subheader style="font-size: 1rem;">Thương hiệu</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                name="supplier"
                rules="required|alpha"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field placeholder="Thương hiệu" outlined v-model="supplier" hide-details></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-subheader style="font-size: 1rem;">Bảo hành</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                name="guarantee"
                rules="required|alpha"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field placeholder="Bảo hành" outlined v-model="guarantee" hide-details></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-subheader style="font-size: 1rem;">Mô tả bảo hành</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                name="guaranteeDes"
                rules="required|alpha"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field
                  placeholder="Mô tả bảo hành"
                  outlined
                  v-model="guaranteeDes"
                  hide-details
                ></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-subheader style="font-size: 1rem;">Tên</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                name="name"
                rules="required|alpha"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field placeholder="Tên" outlined v-model="name" hide-details></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-subheader style="font-size: 1rem;">Màu sắc</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                name="color"
                rules="required|alpha"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field placeholder="Màu sắc" outlined v-model="color" hide-details></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-subheader style="font-size: 1rem;">Màn hình</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                name="screen"
                rules="required|alpha"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field placeholder="Màn hình" outlined v-model="screen" hide-details></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-subheader style="font-size: 1rem;">Độ phân giải</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                name="resolution"
                rules="required|alpha"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field placeholder="Độ phân giải" outlined v-model="resolution" hide-details></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-subheader style="font-size: 1rem;">Camera sau</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                name="rearCamera"
                rules="required|alpha"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field placeholder="Camera sau" outlined v-model="rearCamera" hide-details></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-subheader style="font-size: 1rem;">Camera trước</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                name="frontCamera"
                rules="required|alpha"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field
                  placeholder="Camera trước"
                  outlined
                  v-model="frontCamera"
                  hide-details
                ></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-subheader style="font-size: 1rem;">Chip</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                name="chip"
                rules="required|alpha"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field placeholder="Thương hiệu" outlined v-model="chip" hide-details></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-subheader style="font-size: 1rem;">RAM</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                name="ram"
                rules="required|alpha"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field placeholder="RAM" outlined v-model="ram" hide-details></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-subheader style="font-size: 1rem;">Bộ nhớ trong</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                name="rom"
                rules="required|alpha"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field placeholder="Bộ nhớ trong" outlined v-model="rom" hide-details></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-subheader style="font-size: 1rem;">Pin</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                name="pin"
                rules="required|alpha"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field placeholder="Pin" outlined v-model="pin" hide-details></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-subheader style="font-size: 1rem;">Hệ điều hành</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                name="operatingSystem"
                rules="required|alpha"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field
                  placeholder="Hệ điều hành"
                  outlined
                  v-model="operatingSystem"
                  hide-details
                ></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-subheader style="font-size: 1rem;">Cổng sạc</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                name="chargingPort"
                rules="required|alpha"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field placeholder="Cổng sạc" outlined v-model="chargingPort" hide-details></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-subheader style="font-size: 1rem;">Loại sim</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                name="sim"
                rules="required|alpha"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field placeholder="Loại sim" outlined v-model="sim" hide-details></v-text-field>
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
        <v-col cols="10">
          <vue-editor v-model="content"></vue-editor>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-row>
          <v-btn color="gg-red" class="mx-auto white--text" @click="submit">Submit</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },

  data() {
    return {
      images: [],
      content: "<h1>Some initial content</h1>",
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
    };
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
