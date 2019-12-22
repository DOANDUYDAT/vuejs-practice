<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">Đăng ký</v-btn>
    </template>
    <v-card flat>
      <v-toolbar dark flat>
        <v-card-title class="layout justify-center">
          <span class="headline">ĐĂNG KÝ</span>
        </v-card-title>
      </v-toolbar>
      <v-card-text class="py-0">
        <v-container>
          <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form">
            <v-row align="center" justify="center">
              <v-col cols="12" md="5" class=" py-0">
                <ValidationProvider
                  name="first name"
                  rules="required|alpha"
                  v-slot="{ errors }"
                  :bails="false"
                >
                  <v-text-field label="First name" v-model="firstName" counter="16"></v-text-field>
                  <span class="red--text">{{ errors[0] }}</span>
                </ValidationProvider>
              </v-col>
              <!-- <v-col cols="12" sm="6" md="4">
              <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
              </v-col>-->
              <v-col cols="12" md="5" class="py-0 ">
                <ValidationProvider
                  name="last name"
                  rules="required|alpha"
                  v-slot="{ errors }"
                  :bails="false"
                >
                  <v-text-field label="Last name" v-model="lastName" counter="16"></v-text-field>
                  <span class="red--text">{{ errors[0] }}</span>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="10" class="mx-auto py-0">
                <ValidationProvider
                  name="email"
                  rules="required|email"
                  v-slot="{ errors }"
                  :bails="false"
                >
                  <v-text-field prepend-icon="mdi-email" label="Email" v-model="email"></v-text-field>
                  <span class="red--text">{{ errors[0] }}</span>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="10" class="mx-auto py-0">
                <ValidationProvider
                  name="password"
                  rules="required|min:8"
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
                  ></v-text-field>
                  <span class="red--text">{{ errors[0] }}</span>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="10" class="mx-auto py-0">
                <ValidationProvider
                  name="confirm password"
                  rules="required|min:8|confirmed:password"
                  v-slot="{ errors }"
                  :bails="false"
                >
                  <v-text-field
                    :type="showConfirmPassword ? 'text' : 'password'"
                    label="Confirm Password"
                    v-model="confirmPassword"
                    counter="16"
                    prepend-icon="mdi-lock"
                    :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showConfirmPassword = !showConfirmPassword"
                    @keyup.enter="submit"
                  ></v-text-field>
                  <span class="red--text">{{ errors[0] }}</span>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-col cols="12" md="6" class="mx-auto pt-0">
              <v-card-actions>
                <v-btn
                  color="it-blue-lighten"
                  class="layout justify-center white--text"
                  @click="submit"
                  :disabled="invalid"
                  :loading="loading"
                >Register</v-btn>
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
import { userService } from "@/_api";

export default {
  data() {
    return {
      loading: flase,
      dialog: false,
      email: "",
      confirmPassword: "",
      password: "",
      lastName: "",
      firstName: "",
      value: "",
      showPassword: false,
      showConfirmPassword: false
    };
  },
  methods: {
    async submit() {
      try {
        const isValid = await this.$refs.observer.validate();
        if (isValid) {
          const { lastName, firstName, email, password } = this;
          const userInfo = {
            lastName,
            firstName,
            email,
            password
          };

          // console.log(userInfo);
          this.loading = true;
          const isSuccess = await userService.register(userInfo);
          if (isSuccess) {
            this.$store.dispatch("alert/success", {
              message: "Register successfully!"
            });
            this.resetInput();
            this.loading = false;
            this.dialog = false;
            
          }
        }
      } catch (error) {
        if (error.response) {
          this.$store.dispatch("alert/error", {
            message: error.response.data.detail
          });
        }
      }
    },
    resetInput() {
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.lastName = "";
      this.firstName = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.v-toolbar {
  background-image: linear-gradient(0.25turn, #00bda0 30%, #007ddd);
}
</style>