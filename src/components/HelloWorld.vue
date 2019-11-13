<template>
  <div>
    <button @click="increData">click</button>
    <test-component :product="product"></test-component>
  </div>
</template>

<script>
import TestComponent from "./TestComponent";
export default {
  data() {
    return {
      product: {
        images: [
          "https://file.services.teko.vn/media/49/2/1565062519.9644933_190800033-2.jpg",
          "https://file.services.teko.vn/media/42/43/1565062519.57392_190800033.jpg",
          "https://file.services.teko.vn/media/96/81/1565062519.771172_190800033-1.jpg"
        ]
      }
    };
  },
  methods: {
    increData() {
      this.product = Object.assign({}, this.product, {
        images: [
          "https://file.services.teko.vn/media/62/31/1565062298.7887473_cc.jpg",
          "https://file.services.teko.vn/media/31/36/1565059698.6726525_f.jpg",
          "https://file.services.teko.vn/media/59/74/1565059698.8753529_a.jpg",
          "https://file.services.teko.vn/media/2/50/1565059698.2532487_d.jpg",
          "https://file.services.teko.vn/media/22/96/1565059698.0536354_c.jpg",
          "https://file.services.teko.vn/media/35/81/1565059698.4482443_e.jpg"
        ]
      });
    }
  },
  components: {
    TestComponent
  }
};
</script>