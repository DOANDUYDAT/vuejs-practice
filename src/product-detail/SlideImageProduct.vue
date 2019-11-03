<template>
  <v-container>
    <v-row>
      <v-col>
        <v-img v-if="imageBig"
          height="300"
          width="auto"
          contain
          :src="imageBig"
          class="mx-auto"
        ></v-img>
        <v-img v-else
          height="300"
          width="auto"
          contain
          :src="firstImage"
          class="mx-auto"
        ></v-img>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <template v-for="(image, index) in productImages">
        <v-col cols="1" class="px-1" :key="index">
          <v-hover v-slot:default="{ hover }">
            <v-card :class="{ 'on-hover': hover }" hover raised>
              <v-img height="auto" width="auto" :src="image" @mouseover="mouseOver(image)"></v-img>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      imageBig: ""
    };
  },
  props: {
    product: {}
  },
  computed: {
    productImages() {
      return this.product.images;
    },
    firstImage() {
        if (this.productImages === undefined) {
            return '';
        } else {
            return this.productImages[0];
        }
    }
  },
  methods: {
    mouseOver(image) {
      this.imageBig = image;
    }
  },
  
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