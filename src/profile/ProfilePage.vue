<template>
  <!-- <v-container>
    <v-row>
  <v-col cols="12" md="8" class="mx-auto">-->
  <v-card flat>
    <v-toolbar color="primary" dark flat dense>
      <v-card-title>
        <span class="headline">Thông tin tài khoản</span>
      </v-card-title>
    </v-toolbar>
    <v-row>
      <v-col cols="8">
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
                <v-text-field v-model="date" label="Ngày sinh" solo readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="date" @input="menudate = false"></v-date-picker>
            </v-menu>
          </v-col>
          <!-- <v-col cols="3">
                  <v-select :items="items" label="Ngày" solo dense></v-select>
                </v-col>
                <v-col cols="3">
                  <v-select :items="items" label="Tháng" solo dense></v-select>
                </v-col>
                <v-col cols="3">
                  <v-select :items="items" label="Năm" solo dense></v-select>
          </v-col>-->
        </v-row>
        <v-card-actions>
          <v-row no-gutters>
            <v-btn color="primary" class="mx-auto" @click="updateProfile">Cập nhật</v-btn>
          </v-row>
        </v-card-actions>
      </v-col>
      <v-col cols="4">
        <div class="my-avatar">
          <!-- <v-row justify="center">
          <v-col>-->
          <v-avatar class="profile" color="grey" size="164" tile>
            <v-img :src="avatar"></v-img>
          </v-avatar>
          <!-- </v-col>
          </v-row>-->
        </div>
      </v-col>
    </v-row>
  </v-card>
  <!-- </v-col>
    </v-row>
  </v-container>-->
</template>

<script>
import { userService } from "@/_api";
import { mapState } from "vuex";

export default {
  data() {
    return {
      gender: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      date: null,
      menudate: false,
      avatar: "https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
    };
  },
  methods: {
    async updateProfile() {
      const { gender, firstName, lastName, phone, address, date } = this;
      const userInfo = {
        gender,
        first_name: firstName,
        last_name: lastName,
        phone,
        address,
        date_of_birth: date
      };
      console.log(userInfo);
      try {
        const user = await userService.updateProfile(userInfo);
        if (user) {
          this.$store.dispatch("alert/success", {
            message: "Update Profile Successfully!"
          });

        }
      } catch (error) {
        this.$store.dispatch("alert/error", {
          message: error
        });
      }
    },
    initData() {
      const user = this.user;
      this.firstName = user.first_name;
      this.lastName = user.last_name;
      this.phone = user.phone;
      this.email = user.email;
      this.address = user.address;
      this.date = user.date_of_birth;
      this.gender = user.gender;
    }
  },
  // mounted() {
  //   this.firstName = "";
  // }
  computed: {
    ...mapState({
      user: state => state.authentication.user
    })
  },
  watch: {
    user: 'initData'
  },
  mounted() {
    this.initData();
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