<template>
  <div class="search pa-0">
    

      <v-btn @click="handleClick">click</v-btn>
     
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    handleClick() {
      console.log(this.$vuetify.theme.dark)
    }
  }
};
</script>


