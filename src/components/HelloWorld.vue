<template>
  <div>
    <button @click="increData">click</button>
    <test-component :product="product"></test-component>

    <v-sheet class="mx-auto" elevation="8" max-width="800">
      <v-slide-group v-model="model" class="pa-4" show-arrows>
        <v-slide-item
          v-for="n in 15"
          :key="n"
          v-slot:default="{ active, toggle }"
        >
          <v-card
            :color="active ? 'primary' : 'grey lighten-1'"
            class="ma-4"
            height="200"
            width="120"
            @click="toggle"
          >
            <v-row class="fill-height" align="center" justify="center">
              <v-scale-transition>
                <v-icon
                  v-if="active"
                  color="white"
                  size="48"
                  v-text="'mdi-close-circle-outline'"
                ></v-icon>
              </v-scale-transition>
            </v-row>
          </v-card>
        </v-slide-item>
      </v-slide-group>

      <v-expand-transition>
        <v-sheet v-if="model != null" color="grey lighten-4" height="200" tile>
          <v-row class="fill-height" align="center" justify="center">
            <h3 class="title">Selected {{ model }}</h3>
          </v-row>
        </v-sheet>
      </v-expand-transition>
    </v-sheet>
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
      },
      model: null
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
