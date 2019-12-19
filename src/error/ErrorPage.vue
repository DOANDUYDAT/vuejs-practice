<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="3"></v-col>
      <v-col cols="6">
        <v-img
          class="center"
          max-width="600"
          max-height="400"
          :src="require('@/_assets/image/404-eror.jpg')"
        ></v-img>
        <v-row justify="center" class="mt-2">
          <div>
            <v-btn
              class="white--text"
              color="gg-red"
              tile
              dark
              to="/home"
              exact
            >OK, Quay lại trang chủ!</v-btn>
          </div>
        </v-row>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
  </v-container>
</template>