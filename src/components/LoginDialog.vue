<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">Đăng nhập</v-btn>
    </template>
    <v-card flat>
      <v-toolbar color="primary" dark flat>
        <v-card-title class="layout justify-center">
          <span class="headline">ĐĂNG NHẬP</span>
        </v-card-title>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="8" class="mx-auto">
              <ValidationProvider
                name="email"
                rules="required|email"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field prepend-icon="mdi-email" label="Email" v-model="email"></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
                <!-- <ul>
                  <li v-for="error in errors"> {{ error}}</li>
                </ul>-->
              </ValidationProvider>
            </v-col>
            <v-col cols="12" md="8" class="mx-auto">
              <ValidationProvider
                name="password"
                rules="required|min:8|alpha_num"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field
                  prepend-icon="mdi-lock"
                  label="Password"
                  type="password"
                  v-model="password"
                ></v-text-field>

                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="12" md="4">
              <v-checkbox v-model="checkbox" :label="'Duy trì đăng nhập'"></v-checkbox>
            </v-col>
            <v-col cols="12" md="4" class="text-md-end">
              <a href>Quên mật khẩu?</a>
            </v-col>
          </v-row>
          <v-col md="6" offset-md="3">
            <v-card-actions>
              <v-btn color="primary" class="layout justify-center" @click="login">Login</v-btn>
            </v-card-actions>
          </v-col>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      email: "",
      password: "",
      checkbox: "",
      value: ""
    };
  },
  methods: {
    login() {
      this.dialog = false;
    },
    clear() {
      this.password = "";
      this.email = "";
    }
  }
};
</script>

<style scoped>
</style>