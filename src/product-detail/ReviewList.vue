<template>
  <v-container>
    <v-card>
      <v-tabs grow v-model="tab" @change="changeTab">
        <v-tab
          v-for="(filter, i) in filterFollowStar"
          :key="i"
        >{{ filter.star }}({{ filter.number }})</v-tab>
      </v-tabs>
    </v-card>
    <review-list-item v-for="(comment, index) in listComment" :key="index" :comment="comment"></review-list-item>
    <div class="text-center my-4">
      <v-pagination v-model="page" :length="lenPaginantion" total-visible="6"></v-pagination>
    </div>
  </v-container>
</template>

<script>
import { fakeComments } from "../_helpers/fake-comment";

let allComments = fakeComments();

import ReviewListItem  from "./ReviewListItem";

export default {
  data() {
    return {
      allComments: [...allComments],
      page: 1,
      tab: 0,

      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  components: {
    ReviewListItem
  },
  computed: {
    lenPaginantion() {
      return Math.ceil(this.commentFollowStar.length / 3);
    },
    comment_5_Star() {
      return this.allComments.filter(comment => comment.rating === 5);
    },
    comment_4_Star() {
      return this.allComments.filter(comment => comment.rating === 4);
    },
    comment_3_Star() {
      return this.allComments.filter(comment => comment.rating === 3);
    },
    comment_2_Star() {
      return this.allComments.filter(comment => comment.rating === 2);
    },
    comment_1_Star() {
      return this.allComments.filter(comment => comment.rating === 1);
    },
    commentFollowStar() {
      let commentFollowStar = [];

      switch (this.tab) {
        case 1:
          commentFollowStar = this.comment_5_Star;
          break;
        case 2:
          commentFollowStar = this.comment_4_Star;
          break;
        case 3:
          commentFollowStar = this.comment_3_Star;
          break;
        case 4:
          commentFollowStar = this.comment_2_Star;
          break;
        case 5:
          commentFollowStar = this.comment_1_Star;
          break;
        default:
          commentFollowStar = [...this.allComments];
          break;
      }

      return commentFollowStar;
    },
    listComment() {
      let listComment = [];
      let index = this.page * 3 - 3;

      for (let i = 0; i < 3; i++) {
        if (index < this.commentFollowStar.length) {
          listComment.push(this.commentFollowStar[index]);
          index++;
        }
      }
      return listComment;
    },
    filterFollowStar() {
      let filterFollowStar = [
        {
          star: "Tất cả",
          number: this.allComments.length
        },
        {
          star: "5 sao",
          number: this.comment_5_Star.length
        },
        {
          star: "4 sao",
          number: this.comment_4_Star.length
        },
        {
          star: "3 sao",
          number: this.comment_3_Star.length
        },
        {
          star: "2 sao",
          number: this.comment_2_Star.length
        },
        {
          star: "1 sao",
          number: this.comment_1_Star.length
        }
      ];
      return filterFollowStar;
    },
    defaultPageNumber() {
      if (this.page > this.lenPaginantion) {
        return 1;
      }
    }
  },

  methods: {
    changeTab(number) {
      this.page = 1;
    }
  }
};
</script>