<template>
  <v-container>
    <div class="headline mb-2">
      <v-icon color="amber" class="mr-2">mdi-message-text-outline</v-icon>Bình
      luận
    </div>
    <v-row no-gutters>
      <v-col cols="8"
        ><comment-box></comment-box> <comment-list></comment-list
      ></v-col>
    </v-row>
  </v-container>
</template>

<script>
import CommentList from "./CommentList";
import CommentBox from "./CommentBox";

export default {
  components: {
    CommentList,
    CommentBox
  }
};
</script>

<style lang="scss" scoped>
@import "@/variables.scss";

.container {
  background-color: $it-bg-in;
}
</style>
