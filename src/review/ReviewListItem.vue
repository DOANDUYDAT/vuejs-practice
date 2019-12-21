<template>
  <v-card outlined tile class="px-6">
    <v-card-title class="pt-1 pb-0">{{ userName }}</v-card-title>
    <v-card-text class="pb-0">
      <v-rating
        :value="review.vote"
        color="amber"
        background-color="grey"
        empty-icon="mdi-star-outline"
        full-icon="mdi-star"
        half-icon="mdi-star-half"
        dense
        readonly
        size="14"
      ></v-rating>
      <div style="text-align: justify;" class="mt-2">{{ review.content }}</div>
      <div class="my-2 caption black--text">{{ review.createdAt }}</div>
    </v-card-text>
    <!-- <v-card-actions>
      <v-btn text @click="show = !show">Trả lời</v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.</v-card-text>
      </div>
    </v-expand-transition>-->
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  props: {
    review: {
      type: Object,
      required: true
    }
  },
  computed: {
    userName() {
      return this.review.user.first_name + ' ' + this.review.user.last_name;
    }
  }
};
</script>