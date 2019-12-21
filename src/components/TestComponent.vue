<template>
  <div v-if="!checkProductEmpty">
    <v-slide-group show-arrows>
      <v-slide-item v-for="(image, index) in productImages" :key="index">
        <v-hover v-slot:default="{ hover }">
          <v-card :class="{ 'on-hover': hover }" hover raised>
            <v-img height="auto" width="60" :src="image" contain></v-img>
          </v-card>
        </v-hover>
        <!-- {{ image }} |||| -->
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
// import _ from 'lodash';

export default {
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
        return this.product.images
    }
  },
//   methods: {
//     productImages(product) {
//       return product.images;
//     }
//   }
};
</script>