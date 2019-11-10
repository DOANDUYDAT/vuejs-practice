<template>
  <div>
    <div class="headline">Bình luận</div>
    <!-- <v-row no-gutters>
    <v-col cols="7">-->
    <comment-box></comment-box>
    <comment-list></comment-list>
    <!-- </v-col>
    </v-row>-->
  </div>
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