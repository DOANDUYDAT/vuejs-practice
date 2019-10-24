<template>
<v-app>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">Đăng nhập</v-btn>
    </template>
    <v-card flat>
        <v-toolbar color="primary" dark flat>
            <v-card-title class="layout justify-center">
                <span class="headline">ĐĂNG NHẬP</span>
            </v-card-title>
        </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <!-- <v-col cols="12" sm="6" md="4">
              <v-text-field label="Legal first name*" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Legal last name*"
                hint="example of persistent helper text"
                persistent-hint
                required
              ></v-text-field>
            </v-col> -->
            <v-col md="8" offset-md="2">
              <v-text-field prepend-icon="mdi-email" label="Email*" required></v-text-field>
            </v-col>
            <v-col md="8" offset-md="2">
              <v-text-field prepend-icon="mdi-lock" label="Password*" type="password" required></v-text-field>
            </v-col>
            <!-- <v-col cols="12" sm="6">
              <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-autocomplete
                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                label="Interests"
                multiple
              ></v-autocomplete>
            </v-col> -->
            <v-col md="6" offset-md="3">
              <v-card-actions>
                <v-btn color="primary" class="layout justify-center" @click="login">Login</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
  </v-app>
</template>

<script>


export default {
  data() {
    return {
      dialog: false
    };
  },
  
  methods: {
    login() {
        this.dialog = false
        
    }
  }
};
</script>