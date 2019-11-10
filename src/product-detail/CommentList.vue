<template>
  <!-- <v-container> -->
  <!-- <v-row>
  <v-col cols="7">-->
  <div>
    <comment-list-item v-for="(comment, index) in commentShow" :key="index" :comment="comment"></comment-list-item>
    <v-btn
      class="mx-auto my-2"
      color="primary"
      text
      v-if="showButtonMore"
      @click="getMoreComment"
    >Xem thêm 5 bình luận</v-btn>
  </div>
  <!-- </v-col>
  </v-row>-->
  <!-- </v-container> -->
</template>

<script>
import CommentListItem from "./CommentListItem";
import { fakeComments } from "@/_helpers/fake-comment";

let allComments = fakeComments();
function initComment() {
  let commentList = [];
  for (let i = 0; i < 5; i++) {
    if (i < allComments.length) {
      commentList.push(allComments[i]);
    }
  }
  return commentList;
}

export default {
  data() {
    return {
      allComments: [...allComments],

      commentShow: initComment()
    };
  },
  components: {
    CommentListItem
  },
  computed: {
    // top_10_comment() {
    //   let top_10_comment = [];
    //   for (let i = 0; i < 8; i++) {
    //     if (i < this.allComments.length) {
    //       top_10_comment.push(this.allComments[i]);
    //     }
    //   }
    //   this.offsetComment = top_10_comment.length;
    //   return top_10_comment;
    // },
    showButtonMore() {
      return this.commentShow.length < this.allComments.length ? true : false;
    }
    // commentShowList() {
    //   return this.commentShow.length > 0
    //     ? this.commentShow
    //     : this.top_10_comment;
    // }
  },
  methods: {
    getMoreComment() {
      let offsetComment = this.commentShow.length;

      for (let i = 0; i < 5; i++) {
        if (offsetComment < this.allComments.length) {
          this.commentShow.push(this.allComments[offsetComment]);
          offsetComment++;
        }
      }
    }
  }
};
</script>