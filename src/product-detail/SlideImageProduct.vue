<template>
  <v-col v-if="!checkProductEmpty">
    <v-row>
      <v-col cols="12">
        <!-- <v-img height="auto" width="auto" contain :src="imageBig ? imageBig : firstImage"></v-img> -->
        <v-img height="auto" width="auto" contain :src="imageBig"></v-img>
      </v-col>
    </v-row>

    <!-- <v-slide-group show-arrows>
      <v-slide-item v-for="(image, index) in productImages" :key="index">
        <v-hover v-slot:default="{ hover }">
          <v-card :class="{ 'on-hover': hover }" hover raised>
            <v-img height="auto" width="60" :src="image" @mouseover="mouseOver(image)" contain></v-img>
          </v-card>
        </v-hover>
      </v-slide-item>
    </v-slide-group>-->


    <!-- LỖI DO THẺ V-SLIDE-GROUP GÂY RA -->


    <v-row no-gutters>
      <v-col cols='2' v-for="(image, index) in productImages" :key="index">
        <v-hover v-slot:default="{ hover }">
          <v-card :class="{ 'on-hover': hover }" hover raised>
            <v-img height="auto" width="60" :src="image" @mouseover="mouseOver(image)" contain></v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import _ from "lodash";

export default {
  data() {
    return {
      imageBig: '',
      keyA: 0
    };
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    firstImage() {
      if (!this.checkProductEmpty) {
        return this.product.images[0];
      }
    },
    checkProductEmpty() {
      return _.isEmpty(this.product);
    },
    productImages() {
      const images = this.product.images;
      let productImages = []
      for (let i = 0; i < 6; i++) {
        if ( i < images.length) {
          productImages.push(images[i]);
        }
      }
      return productImages;
    }
  },
  methods: {
    mouseOver(image) {
      this.imageBig = image;
    },
    // productImages(product) {
    //   return product.images;
    // },
    // increKey(index) {
    //   return this.product.id + index;
    // }
    setImageBig() {
      this.imageBig = this.product.images[0];
    }
  },
  mounted() {
    console.log("SlideImageProduct mounted");
  },
  updated() {
    // this.imageBig = "";
    console.log("SlideImageProduct updated");
  },
  // beforeUpdate() {
  //   this.imageBig = "";
  // }
  watch: {
    product: 'setImageBig'
  }
};
</script>

<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.4;
}
</style>