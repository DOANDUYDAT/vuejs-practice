<template>
  <v-container v-if="!checkProductEmpty">
    <v-row>
      <v-col cols="12">
        <v-img height="auto" width="auto" contain :src="imageBig"></v-img>
      </v-col>
    </v-row>

    <v-slide-group show-arrows mandatory>
      <v-slide-item v-for="(image, index) in productImages" :key="index">
        <v-hover v-slot:default="{ hover }">
          <v-card :class="{ 'on-hover': hover }" hover raised>
            <v-img
              height="auto"
              width="70"
              :src="image"
              @mouseover="mouseOver(image)"
              contain
              eager
            ></v-img>
          </v-card>
        </v-hover>
      </v-slide-item>
    </v-slide-group>
  </v-container>
</template>

<script>
import _ from "lodash";

export default {
  data() {
    return {
      imageBig: "",
    };
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    checkProductEmpty() {
      return _.isEmpty(this.product);
    },
    productImages() {
      const images = this.product.images;
      let productImages = [];
      for (let i = 0; i < 6; i++) {
        if (i < images.length) {
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
    initImageBig() {
      this.imageBig = this.product.images[0];
    }
  },
  mounted() {
    console.log("SlideImageProduct mounted");
  },
  updated() {
    console.log("SlideImageProduct updated");
  },

  watch: {
    product: "initImageBig"
  }
};
</script>

<style lang="scss" scoped>
@import '@/style.scss';
.container {
  background-color: $background-child;
  .v-card {
  transition: opacity 0.4s ease-in-out;
  &:not(.on-hover) {
    opacity: 0.4;
  }
}
}

</style>