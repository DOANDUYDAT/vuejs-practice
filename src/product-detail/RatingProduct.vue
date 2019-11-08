<template>
  <v-container>
    <div class="headline mb-2">Đánh giá sản phẩm</div>
    <v-row>
      <v-col cols="5">
        <v-card class="mx-auto" height="100%" flat>
          <v-img height="200px" :src="product.images[0]" contain></v-img>
          <v-card-text>
            <p>{{ product.title }}</p>
            <v-row align="center">
              <div class="headline mx-3">{{rating}}/5</div>
              <div class="body-2">Có {{ number }} đánh giá</div>
            </v-row>
            <v-rating
              :value="rating"
              color="amber"
              background-color="grey"
              empty-icon="mdi-star-outline"
              full-icon="mdi-star"
              half-icon="mdi-star-half"
              half-increments
              small
              readonly
            ></v-rating>
          </v-card-text>
        </v-card>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="6">
        <div class="body-1">Đánh giá của bạn</div>
        <v-rating
          v-model="ratingNumber"
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
            <v-textarea outlined v-model="ratingComment" counter="300" label="Viết đánh giá ở đây"></v-textarea>
            <span class="red--text">{{ errors[0] }}</span>
          </ValidationProvider>
          <div class="my-4">
            <v-btn
              color="primary"
              @click="submit"
              :disabled="(ratingNumber > 0 ? false : true) || invalid" 
            >Gửi đánh giá</v-btn>
          </div>
        </ValidationObserver>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>


export default {
  data() {
    return {
      rating: 3.5,
      number: 25,
      ratingComment: "",
      ratingNumber: 0
    };
  },
  components: {
    
  },
  props: {
    product: {}
  },
  methods: {
    async submit() {
      try {
        console.log("submit rating");
        this.$store.dispatch("alert/addAlert", {
          type: "success",
          message: "Successfully!"
        });
        // this.dialog = false;
      } catch (error) {
        this.$store.dispatch("alert/addAlert", {
          type: "error",
          message: "Login error!"
        });
      }
    }
  }
};
</script>
