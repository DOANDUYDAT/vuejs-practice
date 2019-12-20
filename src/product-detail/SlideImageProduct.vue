<template>
  <v-container v-if="product.id">
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
// import _ from "lodash";

export default {
  data() {
    return {
      imageBig: ""
    };
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    // checkProductEmpty() {
    //   return _.isEmpty(this.product);
    // },
    productImages() {
      const images = [...this.product.images];
      let productImages = [];
      if (images.length) {
        for (let i = 0; i < 6; i++) {
          if (i < images.length) {
            productImages.push(images[i].image);
          }
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
      this.imageBig = this.product.images.length
        ? this.product.images[0].image
        : "";
    }
  },
  watch: {
    product: "initImageBig"
  }
};
</script>

<style lang="scss" scoped>
@import "@/variables.scss";
.container {
  background-color: $it-bg-in;
  .v-card {
    transition: opacity 0.4s ease-in-out;
    &:not(.on-hover) {
      opacity: 0.4;
    }
  }
}
</style>