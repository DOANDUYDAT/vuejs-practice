<template>
  <ul>
    <li v-for="(alert, id) in alerts" :key="id">
      <alert-item :alert="alert"></alert-item>
    </li>
  </ul>
</template>

<script>
import AlertItem from "./AlertItem";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      alerts: state => state.alert.all
    })
  },
  components: {
    AlertItem
  }
};
</script>


<style scoped>
ul {
  position: absolute;
  right: 0;
  /* left: 0; */
}

li {
  list-style: none;
  animation: navLinkFade 0.5s;
}
@keyframes navLinkFade {
  from {
    opacity: 0;
    transform: translateX(50px);
  }

  to {
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>