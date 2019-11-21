<template>
  <v-container>
    <v-card flat>
      <v-toolbar color="primary" dark flat>
        <v-card-title>
          <span class="headline">Reset mật khẩu</span>
        </v-card-title>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <ValidationObserver ref="observer" v-slot="{ invalid }" tag="div">
            <v-row no-gutters justify="center">
              <v-col cols="12">
                <p class="subtitle-1">Nhập Email để nhận mật khẩu mới:</p>
              </v-col>
              <v-col cols="12">
                <ValidationProvider
                  name="email"
                  rules="required|email"
                  v-slot="{ errors }"
                  :bails="false"
                >
                  <v-text-field
                    type="email"
                    label="Email"
                    v-model="email"
                    solo
                    @keyup.enter="submit"
                  ></v-text-field>
                  <span class="red--text">{{ errors[0] }}</span>
                </ValidationProvider>
              </v-col>
            </v-row>

            <v-card-actions>
              <v-row no-gutters>
                <!-- <v-col cols="3"></v-col> -->
                <!-- <v-col cols="12"> -->
                <v-btn color="primary" class="mx-auto" @click="submit" :disabled="invalid">Xác nhận</v-btn>
                <!-- </v-col> -->
              </v-row>
            </v-card-actions>
          </ValidationObserver>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { userService } from "@/_api";
export default {
  data() {
    return {
      email: ""
    };
  },
  methods: {
    async submit() {
      const email = this.email;
      try {
        const isValid = await this.$refs.observer.validate();
        if (isValid) {
          const response = await userService.resetPassword(email);
          if (response) {
            this.email = "";
            this.$refs.observer.reset();
            this.$store.dispatch("alert/success", {
              message: "Reset successfully! Please check your email."
            });
          }
        }
      } catch (error) {
        this.$store.dispatch("alert/error", {
          message: error
        });
      }
    }
  }
};
</script>