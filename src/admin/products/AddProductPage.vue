<template>
  <div>
    <vue-editor v-model="content"></vue-editor>
    <v-btn @click="handleClick">click</v-btn>
    <v-btn :to="'/products/' + undefined" exact>product</v-btn>
  </div>
</template>
 
<script>
import { VueEditor } from "vue2-editor";
 
export default {
  components: {
    VueEditor
  },
 
  data() {
    return {
      content: "<p>Write here</p>"
    };
  },
  methods: {
    handleClick() {
      console.log('asd')
      this.$router.push('/products/1asd')
    }
  }
};
</script>