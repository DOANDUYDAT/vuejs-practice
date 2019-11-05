<template>
  <v-card flat>
    <v-toolbar color="primary" dark flat>
      <v-card-title>
        <span class="headline">Đổi Mật Khẩu</span>
      </v-card-title>
    </v-toolbar>
    <v-card-text>
      <v-container>
        <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form">
          <v-row>
            <v-col cols="3" offset-md="1">
              <v-subheader>Mật Khẩu Hiện Tại</v-subheader>
            </v-col>
            <v-col cols="9" md="6" class="mx-auto ml-0 pl-0">
              <ValidationProvider
                name="old password"
                rules="required|min:8"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field
                  :type="showOldPassword ? 'text' : 'password'"
                  label="Mật Khẩu Hiện Tại"
                  v-model="oldPassword"
                  counter="16"
                  solo
                  :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showOldPassword = !showOldPassword"
                ></v-text-field>

                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
            <v-col cols="3" offset-md="1">
              <v-subheader>Mật Khẩu Mới</v-subheader>
            </v-col>
            <v-col cols="9" md="6" class="mx-auto ml-0 pl-0">
              <ValidationProvider
                name="password"
                rules="required|min:8"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field
                  :type="showPassword ? 'text' : 'password'"
                  label="Mật Khẩu Mới"
                  v-model="password"
                  counter="16"
                  solo
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
            <v-col cols="3" offset-md="1">
              <v-subheader>Xác Nhận Mật Khẩu</v-subheader>
            </v-col>
            <v-col cols="9" md="6" class="mx-auto ml-0 pl-0">
              <ValidationProvider
                name="confirm password"
                rules="required|min:8|confirmed:password"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field
                  :type="showConfirmPassword ? 'text' : 'password'"
                  label="Xác Nhận Mật Khẩu"
                  v-model="confirmPassword"
                  counter="16"
                  solo
                  :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showConfirmPassword = !showConfirmPassword"
                ></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-col md="6" offset-md="4" class="pl-0">
            <v-card-actions class="pl-0">
              <v-btn color="primary" @click="submit" :disabled="invalid">Xác nhận</v-btn>
            </v-card-actions>
          </v-col>
        </ValidationObserver>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      confirmPassword: "",
      password: "",
      oldPassword: "",
      showPassword: false,
      showConfirmPassword: false,
      showOldPassword: false
    };
  },
  methods: {
    async submit() {
      try {
        const isValid = await this.$refs.observer.validate();
        this.$store.dispatch("alert/addAlert", {
          type: "success",
          message: "Reset Password successfully!"
        });
        this.dialog = false;
      } catch (error) {
        this.$store.dispatch("alert/addAlert", {
          type: "error",
          message: "Reset Password error!"
        });
      }
    },
    
  }
};
</script>

<style scoped>
</style>