<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">Đăng ký</v-btn>
    </template>
    <v-card flat>
      <v-toolbar color="primary" dark flat>
        <v-card-title class="layout justify-center">
          <span class="headline">ĐĂNG KÝ</span>
        </v-card-title>
      </v-toolbar>
      <v-card-text class="py-0">
        <v-container>
          <v-row align="center" justify="center">
            <v-col cols="12" md="5" class="py-0">
              <ValidationProvider
                name="first name"
                rules="required|alpha"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field
                  label="First name" 
                  v-model="firstName"
                  counter="16"
                ></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
            <!-- <v-col cols="12" sm="6" md="4">
              <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
            </v-col> -->
            <v-col cols="12" md="5" class="py-0" >
              <ValidationProvider
                name="last name"
                rules="required|alpha"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field
                  label="Last name" 
                  v-model="lastName"
                  counter="16"
                ></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="12" md="10" class="py-0">
              <v-menu
                v-model="menudate"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    label="Birthday date"
                    append-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
              </v-menu>
            </v-col>
            <!-- <v-col cols="12" md="5" class="py-0">
              <v-autocomplete
                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                label="Address"
                
              ></v-autocomplete>
            </v-col> -->
          </v-row>
          <v-row>
            <v-col cols="12" md="10" class="mx-auto py-0">
              <ValidationProvider
                name="email"
                rules="required|email"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field
                  prepend-icon="mdi-email" 
                  label="Email" 
                  v-model="email"
                ></v-text-field>
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
                ></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-col cols="12" md="6" class="mx-auto pt-0">
        <v-card-actions>
          <v-btn color="primary" class="layout justify-center" @click="register">Register</v-btn>
        </v-card-actions>
      </v-col>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      dialog: false,
      email: "",
      confirmPassword: "",
      password: "",
      lastName: "",
      firstName: "",
      value: "",
      date: null,
      menudate: false,
      showPassword: false,
      showConfirmPassword: false,
    };
  },
  computed: {
    ...mapState({
      loginStatus: state => state.login.loginStatus
    })
  },
  methods: {
    register() {
        this.dialog = false
    }
  }
};
</script>

<style scoped>

</style>