<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-html="product.description"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/variables.scss";
.container {
  background-color: $it-bg-in;
}
</style>