<template>
  
    <v-footer
      absolute
      padless
      app
      dark
    >
      <v-card
        flat
        tile
        width="100%"
        class="text-center"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4"
            icon
          >
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>

    
  
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'mdi-home',
        'mdi-email',
        'mdi-calendar',
        'mdi-delete',
      ],
      items: [
        'default',
        'absolute',
        'fixed',
        'app'
      ],
      padless: true,
      variant: 'default',
    }),
    computed: {
      
    },
  }
</script>

<style lang="scss" scoped>
.v-card {
  background-image: linear-gradient(0.25turn, #00bda0 30%, #007ddd);
}
</style>