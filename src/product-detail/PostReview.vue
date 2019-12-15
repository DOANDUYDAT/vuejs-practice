<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <div class="headline">Mô tả sản phẩm</div>
        <template v-if="!fullPost">
          <div v-html="summaryPost" class="py-5"></div>
          <v-btn small @click="fullPost = true">Xem chi tiết</v-btn>
        </template>
        <template v-else>
          <div v-html="product.description" class="py-5"></div>
          <v-btn small @click="fullPost = false">Thu gọn</v-btn>
        </template>
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      fullPost: false
    }
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  }, 
  computed: {
    summaryPost() {
      if (this.product.description) {
        return this.product.description.substr(0, 400) + '<span>...</span>';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/variables.scss";
.container {
  background-color: $it-bg-in;
  height: 100%;
}
</style>