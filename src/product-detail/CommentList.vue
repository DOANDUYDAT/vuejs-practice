<template>
  <v-container>
    <comment-list-item v-for="(comment, index) in listComment" :key="index" :comment="comment"></comment-list-item>
    <div class="text-center my-4">
      <v-pagination v-model="page" :length="lenAllComments" total-visible="5"></v-pagination>
    </div>
  </v-container>
</template>

<script>
function fakeComments() {
  let all = [];
  for (let i = 0; i < 25; i++) {
    let d = new Date();
    let day = Math.floor(Math.random() * 31) + 1;
    let month = Math.floor(Math.random() * 12) + 1;
    let year = d.getFullYear();
    let time = `${day}/${month}/${year}`;
    all.push({
      username: "john" + Math.floor(Math.random() * 25) + 1,
      rating: Math.floor(Math.random() * 5) + 1,
      time: time,
      content:
        "Sản phẩm dùng đã được sử dụng 2 ngày, nhìn chung khá tốt, chưa có hiện tượng gì xảy ra. Dịch vụ tư vấn khá tốt. Cho 5 sao!!! <3"
    });
  }
  return all;
}

let allComments = fakeComments();

import CommentListItem from "./CommentListItem";

export default {
  data() {
    return {
      allComments: [...allComments],
      page: 1
    };
  },
  components: {
    CommentListItem
  },
  computed: {
    lenAllComments() {
      return this.allComments.length;
    },
    listComment() {
      let listComment = [];
      let index = this.page - 1;
      for (let i = 0; i < 5; i++) {
        if (index < this.lenAllComments) {
          listComment.push(this.allComments[index]);
          index++;
        }
      }
      return listComment;
    }
  },
  methods: {}
};
</script>