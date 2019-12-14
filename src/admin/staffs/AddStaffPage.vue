<template>
  <div>
    <v-card flat>
      <v-toolbar color="primary" dark flat>
        <v-card-title>
          <span class="headline">Thêm nhân viên</span>
        </v-card-title>
      </v-toolbar>
      <v-row>
        <v-col cols="8">
          <v-row no-gutters justify="center">
            <v-col cols="12" md="3">
              <v-subheader class="text-size ml-6">First Name</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                name="first name"
                rules="required|alpha"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field
                  placeholder="First Name"
                  outlined
                  v-model="staff.firstName"
                  counter="16"
                ></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row no-gutters justify="center">
            <v-col cols="12" md="3">
              <v-subheader class="text-size ml-6">Last Name</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                name="last name"
                rules="required|alpha"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field
                  placeholder="Last Name"
                  outlined
                  v-model="staff.lastName"
                  counter="16"
                ></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row no-gutters justify="center">
            <v-col cols="12" md="3">
              <v-subheader class="text-size ml-6">Email</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <ValidationProvider
                name="email"
                rules="required|email"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field placeholder="Email" outlined v-model="staff.email"></v-text-field>
                <span class="red--text">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row no-gutters justify="center">
            <v-col cols="12" md="3">
              <v-subheader class="text-size ml-6 ml-6">Role</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <v-select :items="roles" v-model="staff.role" placeholder="Role" outlined></v-select>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-row>
          <v-btn color="gg-red" class="mx-auto white--text" @click="submit">Submit</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { staffService } from "@/_api";

export default {
  data() {
    return {
      staff: {
        firstName: "",
        lastName: "",
        email: "",
        role: ""
      },
      roles: ["staff", "admin"],
    };
  },

  methods: {
    async submit() {
      const staff = this.staff;
      try {
        const isSuccess = await staffService.createStaff(staff);
        if (isSuccess) {
          this.$store.dispatch("alert/success", {
            message: "Create Staff Successfully!"
          });
          this.itemSelected = [];
        }
      } catch (error) {
        if (error.response) {
          this.$store.dispatch("alert/error", {
            message: error.response.data
          });
        }
      }
    }
  }
};
</script>

<style scoped>
.text-size {
  font-size: 1rem;
}
</style>
