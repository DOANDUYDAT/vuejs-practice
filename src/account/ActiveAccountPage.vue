<template>
  <v-container>
    <v-row>
      <v-card flat :width="600" class="mx-auto">
        <v-toolbar color="it-green-lighten" dark flat>
          <v-card-title class="layout justify-center">
            <span class="headline">Xác thực tài khoản</span>
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
                    name="email"
                    rules="required"
                    v-slot="{ errors }"
                    :bails="false"
                  >
                    <v-text-field prepend-icon="mdi-account-key" label="Code" v-model="code"></v-text-field>
                    <span class="red--text">{{ errors[0] }}</span>
                    <!-- <ul>
                  <li v-for="error in errors"> {{ error}}</li>
                    </ul>-->
                  </ValidationProvider>
                </v-col>
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
              </v-row>
            </ValidationObserver>
          </v-container>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { userService } from "@/_api"
export default {
  data() {
    return {
      code: '',
      email: ''
    }
  },
  methods: {
    async submit () {
      try {
        const { email, code } = this
        const isValid = await this.$refs.observer.validate();
        if (isValid) {
          const isSuccess = await userService.activeAccount(email, code);

          if (isSuccess) {
            this.$store.dispatch("alert/success", {
              message: "Active Account Successfully!"
            });

            this.$router.push({ path: '/home'});
          }
        }
      } catch (error) {
        if (error.response) {
          this.$store.dispatch("alert/error", {
            message: error.response.data.detail
          });
        }
      }
    }
  }
}
</script>