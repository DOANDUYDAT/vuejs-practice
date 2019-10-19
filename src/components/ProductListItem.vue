<template>
  <v-card>
    <v-img
      class="white--text align-end"
      height="200px"
      :src="product.url"
    >
      <v-card-title>samsung</v-card-title>
    </v-img>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn>MUA</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    product: {}
  }
};
</script>

