<template>
  <v-container>
    <div class="headline mb-2">
      <v-icon color="amber" class="mr-2">mdi-message-text-outline</v-icon>Bình luận
    </div>
    <comment-box></comment-box>
    <comment-list></comment-list>
  </v-container>
</template>

<script>
import CommentList from "./CommentList";
import CommentBox from "./CommentBox";

export default {
  components: {
    CommentList,
    CommentBox
  },
  mounted() {
    console.log('CommentProduct mounted');
  },
  updated(){
    console.log('CommentProduct updated')
  }
};
</script>

<style lang="scss" scoped>
@import "@/variables.scss";

.container {
  background-color: $it-bg-in;
}
</style>