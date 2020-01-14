<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" class="post">
        <div class="headline">Mô tả sản phẩm</div>
        <template v-if="!fullPost">
          <div v-html="summaryPost" class="py-5"></div>
          <v-btn small @click="fullPost = true" class="my-5">Xem chi tiết</v-btn>
        </template>
        <template v-else>
          <div v-html="product.description" class="py-5"></div>
          <v-btn small @click="fullPost = false" class="my-5">Thu gọn</v-btn>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      fullPost: false,
      postContent: null
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
        return this.product.description.substr(0, 900) + '<span>...</span>';
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
/* width */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.post {
  overflow: auto;
  text-align: justify;
}
</style>