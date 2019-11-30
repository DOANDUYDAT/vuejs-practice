<template>
  <div>
    <v-btn @click="handleClick">click</v-btn>
    
    <breadcrumb-base :fullPath="$route.fullPath"></breadcrumb-base>
  </div>
</template>

<script>
import _ from 'lodash';
// import BreadcrumbBase from "./BreadcrumbBase";

export default {
  data() {
    return {
      orderId: 1,
      itemsBreadcrumb: [],
    };
  },
  methods: {
    handleClick() {
      this.$router.push({ name: "orders", params: { order_id: this.orderId} });
    },
  },
  components: {
    // BreadcrumbBase
  }
};
</script>