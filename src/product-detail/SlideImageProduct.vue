<template>
  <v-col v-if="product">
    <v-row>
      <v-col cols="12">
        <v-img height="auto" width="auto" contain :src="imageBig ? imageBig : firstImage"></v-img>
      </v-col>
    </v-row>

    <v-slide-group show-arrows>
      <v-slide-item v-for="(image, index) in productImages" :key="index">
        <v-hover v-slot:default="{ hover }">
          <v-card :class="{ 'on-hover': hover }" hover raised>
            <v-img height="auto" width="60" :src="image" @mouseover="mouseOver(image)" contain></v-img>
          </v-card>
        </v-hover>
      </v-slide-item>
    </v-slide-group>

    <!-- <v-row align="center" justify="center">
      <template v-for="(image, index) in productImages">
        <v-col cols="2" class="px-1" :key="index">
          <v-hover v-slot:default="{ hover }">
            <v-card :class="{ 'on-hover': hover }" hover raised>
              <v-img height="auto" width="auto" :src="image" @mouseover="mouseOver(image)" contain></v-img>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>-->
  </v-col>
</template>

<script>
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
    productImages() {
      return this.product.images;
    },
    firstImage() {
      if (this.productImages === undefined) {
        return "";
      } else {
        return this.productImages[0];
      }
    },
  },
  methods: {
    mouseOver(image) {
      this.imageBig = image;
    }
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