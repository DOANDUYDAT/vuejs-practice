<template>
  <v-card flat>
    <v-toolbar color="primary" dark flat>
      <v-card-title>
        <span class="headline">Thông tin tài khoản</span>
      </v-card-title>
    </v-toolbar>
    <v-row>
      <v-col cols="8">
        <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form">
          <v-row no-gutters justify="center">
            <v-col cols="12" md="3">
              <v-subheader>First Name</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                name="first name"
                rules="required|alpha"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field label="First Name" solo v-model="firstName" counter="16"></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row no-gutters justify="center">
            <v-col cols="12" md="3">
              <v-subheader>Last Name</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                name="last name"
                rules="required|alpha"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field label="Last Name" solo v-model="lastName" counter="16"></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row no-gutters justify="center">
            <v-col cols="12" md="3">
              <v-subheader>Số điện thoại</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                name="phone number"
                :rules="{required: true, regex:/^(0|\+84)[0-9]{9}$/}"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field label="Số điện thoại" solo v-model="phone"></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row no-gutters justify="center">
            <v-col cols="12" md="3">
              <v-subheader>Email</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <v-text-field solo disabled v-model="email"></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters justify="center">
            <v-col cols="12" md="3">
              <v-subheader>Địa chỉ</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <v-text-field label="Địa chỉ" solo v-model="address"></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters justify="center">
            <v-col cols="12" md="3">
              <v-subheader>Giới tính</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <v-radio-group v-model="gender" row class="mt-2">
                <v-radio label="Nam" value="Nam"></v-radio>
                <v-radio label="Nữ" value="Nữ"></v-radio>
                <v-radio label="Khác" value="Khác"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row no-gutters justify="center">
            <v-col cols="12" md="3">
              <v-subheader>Ngày sinh</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <v-menu
                v-model="menudate"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="dateOfBirth" label="Ngày sinh" solo readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="dateOfBirth" @input="menudate = false"></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-row no-gutters>
              <v-btn color="primary" class="mx-auto" @click="updateProfile">Cập nhật</v-btn>
            </v-row>
          </v-card-actions>
        </ValidationObserver>
      </v-col>
      <v-col cols="4">
        <div class="my-avatar">
          <v-avatar class="profile" color="grey" size="164" tile>
            <v-img :src="avatar"></v-img>
          </v-avatar>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { userService } from "@/_api";
import { mapState } from "vuex";

export default {
  data() {
    return {
      user: {},
      gender: "",
      firstName: "",
      lastName: "",
      phone: 0,
      email: "",
      address: "",
      dateOfBirth: null,
      menudate: false,
      avatar: "https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
    };
  },
  methods: {
    async updateProfile() {
      try {
        const isValid = await this.$refs.observer.validate();
        if (isValid) {
          const {
            gender,
            firstName,
            lastName,
            phone,
            address,
            dateOfBirth
          } = this;
          const userInfo = {
            gender,
            firstName,
            lastName,
            phone,
            address,
            dateOfBirth
          };
          const isSuccess = await userService.updateProfile(userInfo);
          if (isSuccess) {
            await this.getData();
            this.$store.dispatch("alert/success", {
              message: "Update Successfully!"
            });
          }
        }
      } catch (error) {
        if (error.response) {
          this.$store.dispatch("alert/error", {
            message: error.response.data.message
          });
        }
      }
    },
    async getData() {
      this.user = await userService.getProfile();
      const user = this.user;
      this.firstName = user.first_name;
      this.lastName = user.last_name;
      this.phone = user.phone;
      this.email = user.email;
      this.address = user.address;
      this.dateOfBirth = user.date_of_birth;
      this.gender = user.gender;
    }
  },
  computed: {},
  created() {
    this.getData();
  }
};
</script>

<style scoped>
.profile {
  display: block;
  margin: auto;
}
.my-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>