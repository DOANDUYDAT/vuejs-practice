<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <div class="headline">Mô tả sản phẩm</div>
        <div v-html="product.description" class="py-5"></div>
      </v-col>
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