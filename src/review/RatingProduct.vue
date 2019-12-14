<template>
  <v-row>
    <v-col cols="5" v-if="product.id">
      <v-card class="mx-auto" height="100%" flat>
        <v-img height="200px" :src="product.images[0].image" contain></v-img>
        <v-card-text>
          <p>{{ product.title }}</p>
          <v-row justify="center">
            <div class="headline mx-3">{{ product.voting }}/5</div>
            <v-rating
              :value="product.voting"
              color="amber"
              background-color="grey"
              empty-icon="mdi-star-outline"
              full-icon="mdi-star"
              half-icon="mdi-star-half"
              half-increments
              small
              readonly
            ></v-rating>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-divider vertical></v-divider>
    <v-col cols="6">
      <div class="body-1">Đánh giá của bạn</div>
      <v-rating
        v-model="review.vote"
        color="amber"
        background-color="grey"
        empty-icon="mdi-star-outline"
        full-icon="mdi-star"
        half-icon="mdi-star-half"
        half-increments
      ></v-rating>
      <div class="body-1 mb-3">Nội dung đánh giá</div>
      <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form">
        <ValidationProvider
          name="rating comment"
          rules="required|max:300"
          v-slot="{ errors }"
          :bails="false"
        >
          <v-textarea
            outlined
            v-model="review.content"
            counter="300"
            label="Viết đánh giá ở đây"
          ></v-textarea>
          <span class="red--text">{{ errors[0] }}</span>
        </ValidationProvider>
        <div class="my-4">
          <v-btn
            color="primary"
            @click="submit"
            :disabled="(review.vote > 0 ? false : true) || invalid"
            >Gửi đánh giá</v-btn
          >
        </div>
      </ValidationObserver>
    </v-col>
  </v-row>
</template>

<script>
import _ from "lodash";
import { productService } from "@/_api";

export default {
  data() {
    return {
      rating: 3.5,
      review: {
        content: "",
        vote: 0
      }
    };
  },
  components: {},
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {},
  methods: {
    async submit() {
      const review = this.review;
      const productId = this.$route.params.productId;
      console.log(review);
      try {
        const isSuccess = await productService.createReview(review, productId);
        if (isSuccess) {
          this.$store.dispatch("alert/success", {
            message: "Create Successfully!"
          });
          this.resetInput();
        }
        // this.dialog = false;
      } catch (error) {
        if (error.response) {
          this.$store.dispatch("alert/error", {
            message: error.response.data.message
          });
        }
      }
    },
    resetInput() {
      this.review.vote = 0;
      this.review.content = "";
      this.review.user = "";
    }
  }
};
</script>
