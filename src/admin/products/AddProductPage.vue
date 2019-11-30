<template>
  <div>
    <v-card flat>
      <v-toolbar color="primary" dark flat>
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
                <v-text-field label="First Name" outlined v-model="firstName" counter="16"></v-text-field>
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
                <v-text-field label="Last Name" outlined v-model="lastName" counter="16"></v-text-field>
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
                <v-text-field label="Số điện thoại" outlined v-model="phone"></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row no-gutters justify="center">
            <v-col cols="12" md="3">
              <v-subheader>Email</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <v-text-field outlined disabled v-model="email"></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters justify="center">
            <v-col cols="12" md="3">
              <v-subheader>Địa chỉ</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <v-text-field label="Địa chỉ" outlined v-model="address"></v-text-field>
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
                  <v-text-field v-model="date" label="Ngày sinh" outlined readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="date" @input="menudate = false"></v-date-picker>
              </v-menu>
            </v-col>
            <!-- <v-col cols="3">
                  <v-select :items="items" label="Ngày" outlined dense></v-select>
                </v-col>
                <v-col cols="3">
                  <v-select :items="items" label="Tháng" outlined dense></v-select>
                </v-col>
                <v-col cols="3">
                  <v-select :items="items" label="Năm" outlined dense></v-select>
            </v-col>-->
          </v-row>
          
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
    <vue-editor v-model="content"></vue-editor>
    <v-row>
      <v-btn color="gg-red" class="mx-auto white--text" @click="submit">Submit</v-btn>
    </v-row>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },

  data() {
    return {
      content: "<h1>Some initial content</h1>"
    };
  },

  methods: {
    submit() {
      console.log(this.content);
    }
  }
};
</script>