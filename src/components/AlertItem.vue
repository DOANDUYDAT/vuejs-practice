<template>
  
  <v-alert
    class="ma-1"
    min-width="250"
    dense
    :type="alert.type"
    
  >
    {{ alert.message }}
  </v-alert>
  <!-- </div> -->
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      snackbar: true,
      // alertStatus: true
    };
  },
  props: ["alert"]
};
</script>