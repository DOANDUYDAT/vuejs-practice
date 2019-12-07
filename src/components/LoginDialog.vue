<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">Đăng nhập</v-btn>
    </template>
    <v-card flat>
      <v-toolbar color="it-green-lighten" dark flat>
        <v-card-title class="layout justify-center">
          <span class="headline">ĐĂNG NHẬP</span>
        </v-card-title>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form">
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
                  rules="required|min:4"
                  v-slot="{ errors }"
                  :bails="false"
                >
                  <v-text-field
                    :type="showPassword ? 'text' : 'password'"
                    label="Password"
                    v-model="password"
                    counter="16"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    @keyup.enter="submit"
                  ></v-text-field>

                  <span class="red--text">{{ errors[0] }}</span>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row align="center" justify="center" no-gutters>
              <v-col cols="12" md="5">
                <v-checkbox v-model="remember" :label="'Duy trì đăng nhập'"></v-checkbox>
              </v-col>
              <v-col cols="12" md="3" class="text-md-end">
                <a @click="goToForgetPasswordPage">Quên mật khẩu?</a>
              </v-col>
            </v-row>
            <v-col md="6" offset-md="3">
              <v-card-actions>
                <v-btn
                  color="it-blue-lighten"
                  class="layout justify-center white--text"
                  @click="submit"
                  :disabled="invalid"
                >Login</v-btn>
              </v-card-actions>
            </v-col>
          </ValidationObserver>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      email: "",
      showPassword: false,
      password: "",
      remember: false
    };
  },
  computed: {
    ...mapState({
      loggedIn: state => state.authentication.status.loggedIn
    })
  },
  methods: {
    goToForgetPasswordPage() {
      const path = this.$route.path;
      this.dialog = false;
      if (path !== "/forget-password") {
        this.$router.push({ name: "forget password" });
      }
    },
    async submit() {
      try {
        const isValid = await this.$refs.observer.validate();
        if (isValid) {
          const { email, password, remember } = this;
          const user = await this.$store.dispatch("authentication/login", {
            email,
            password,
            remember
          });
          // console.log("user: " + user);
          if (user) {
            this.$store.dispatch("alert/success", {
              message: "Login Successfully!"
            });
            this.dialog = false;
            const fullPath = this.$route.query.redirect;
            if (fullPath) {
              this.$router.push({ path: fullPath });
            }
          }
        }
      } catch (error) {
        if (error) {
          this.$store.dispatch("alert/error", {
            message: error
          });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.v-toolbar {
  background-image: linear-gradient(0.25turn, #00bda0 30%, #007ddd);
}
</style>