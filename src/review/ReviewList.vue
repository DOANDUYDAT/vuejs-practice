<template>
  <div class="py-4" v-if="allReviews.length">
    <v-card outlined>
      <v-tabs grow v-model="tab" @change="changeTab">
        <v-tab
          v-for="(filter, i) in filterFollowStar"
          :key="i"
        >{{ filter.star }}({{ filter.number }})</v-tab>
      </v-tabs>
    </v-card>
    <review-list-item v-for="(review, index) in listReview" :key="index" :review="review"></review-list-item>
    <div class="text-center mt-4">
      <v-pagination v-model="page" :length="lenPaginantion" total-visible="6"></v-pagination>
    </div>
  </div>
  <div v-else>
    <div class="headline">Chưa có đánh giá</div>
  </div>
</template>

<script>
import { productService } from "@/_api";
import ReviewListItem  from "./ReviewListItem";

export default {
  data() {
    return {
      allReviews: [],
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
      return Math.ceil(this.reviewFollowStar.length / 3);
    },
    review_5_Star() {
      return this.allReviews.filter(review => review.rating === 5);
    },
    review_4_Star() {
      return this.allReviews.filter(review => review.rating === 4);
    },
    review_3_Star() {
      return this.allReviews.filter(review => review.rating === 3);
    },
    review_2_Star() {
      return this.allReviews.filter(review => review.rating === 2);
    },
    review_1_Star() {
      return this.allReviews.filter(review => review.rating === 1);
    },
    reviewFollowStar() {
      let reviewFollowStar = [];

      switch (this.tab) {
        case 1:
          reviewFollowStar = this.review_5_Star;
          break;
        case 2:
          reviewFollowStar = this.review_4_Star;
          break;
        case 3:
          reviewFollowStar = this.review_3_Star;
          break;
        case 4:
          reviewFollowStar = this.review_2_Star;
          break;
        case 5:
          reviewFollowStar = this.review_1_Star;
          break;
        default:
          reviewFollowStar = [...this.allReviews];
          break;
      }

      return reviewFollowStar;
    },
    listReview() {
      let listReview = [];
      let index = this.page * 3 - 3;

      for (let i = 0; i < 3; i++) {
        if (index < this.reviewFollowStar.length) {
          listReview.push(this.reviewFollowStar[index]);
          index++;
        }
      }
      return listReview;
    },
    filterFollowStar() {
      let filterFollowStar = [
        {
          star: "Tất cả",
          number: this.allReviews.length
        },
        {
          star: "5 sao",
          number: this.review_5_Star.length
        },
        {
          star: "4 sao",
          number: this.review_4_Star.length
        },
        {
          star: "3 sao",
          number: this.review_3_Star.length
        },
        {
          star: "2 sao",
          number: this.review_2_Star.length
        },
        {
          star: "1 sao",
          number: this.review_1_Star.length
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
    },
    async getData() {
      const productId = this.$route.params.productId;
      this.allReviews = await productService.getAllReviews(productId);
    }
  },
  created() {
    this.getData();
  }
};
</script>