<template>
  <div>
    <template v-if="commentShow.length > 0">
      <comment-list-item v-for="comment in commentShow" :key="comment.id" :comment="comment"></comment-list-item>
      <v-row>
        <v-btn
          class="mx-auto my-2"
          color="primary"
          text
          v-if="showButtonMore"
          @click="getMoreComment"
        >Xem thêm 5 bình luận</v-btn>
      </v-row>
    </template>
    <template v-else>
      <div class="headline">Chưa có bình luận</div>
    </template>
  </div>
</template>

<script>
import CommentListItem from "./CommentListItem";
import { productService } from "@/_api";

export default {
  data() {
    return {
      allComments: [],
      commentShow: []
    };
  },
  components: {
    CommentListItem
  },
  computed: {
    showButtonMore() {
      return this.commentShow.length < this.allComments.length ? true : false;
    },
    productId() {
      return this.$route.params.productId;
    }
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
    },
    initComment() {
      let commentList = [];
      const allComments = this.allComments;
      for (let i = 0; i < 5; i++) {
        if (i < allComments.length) {
          commentList.push(allComments[i]);
        }
      }
      return commentList;
    },
    async getData() {
      const productId = this.productId;
      this.allComments = await productService.getAllComments(productId);
      this.commentShow = this.initComment();
    }
  }
};
</script>