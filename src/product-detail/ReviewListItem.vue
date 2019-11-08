<template>
  <v-card tile elevation="2" outlined>
    <v-card-title>{{ comment.username }}</v-card-title>
    <v-card-text>
      <v-rating
        :value="comment.rating"
        color="amber"
        background-color="grey"
        empty-icon="mdi-star-outline"
        full-icon="mdi-star"
        half-icon="mdi-star-half"
        dense
        readonly
        size="14"
      ></v-rating>
      <div style="text-align: justify;" class="mt-2">{{ comment.content }}</div>
      <div class="my-4 caption black--text">{{ comment.time }}</div>
    </v-card-text>
    <!-- <v-card-actions>
      <v-btn text @click="show = !show">Trả lời</v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.</v-card-text>
      </div>
    </v-expand-transition>-->
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      show: false
      //   comment: {
      //     username: "john" + Math.floor(Math.random() * 25) + 1,
      //     rating: Math.floor(Math.random() * 5) + 1,
      //     time: new Date(Date.now()),
      //     content:
      //       "Sản phẩm dùng đã được sử dụng 2 ngày, nhìn chung khá tốt, chưa có hiện tượng gì xảy ra. Dịch vụ tư vấn khá tốt. Cho 5 sao!!! <3 Sản phẩm dùng đã được sử dụng 2 ngày, nhìn chung khá tốt, chưa có hiện tượng gì xảy ra. Dịch vụ tư vấn khá tốt. Cho 5 sao!!! <3"
      //   }
    };
  },
  props: {
    comment: {}
  }
};
</script>