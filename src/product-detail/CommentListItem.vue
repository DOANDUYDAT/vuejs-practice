<template>
  <v-card tile elevation="2" outlined class="px-6">
    <v-card-title class="pt-1 pb-0">{{ comment.username }}</v-card-title>
    <v-card-text class="pb-0">
      <div style="text-align: justify;" class="mt-2">{{ comment.content }}</div>
      <div class="my-2 caption black--text">{{ comment.time }}</div>
    </v-card-text>
    <v-card-actions class="py-0">
      <v-btn text @click="show = !show">Trả lời</v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <!-- <v-row>
        <v-col cols="12" md="8"  class="mx-auto">-->
        <comment-box></comment-box>
        <!-- </v-col>
        </v-row>-->
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import CommentBox from "./CommentBox";

export default {
  data() {
    return {
      show: false
    };
  },
  components: {
    CommentBox
  },
  props: {
    comment: {}
  }
};
</script>