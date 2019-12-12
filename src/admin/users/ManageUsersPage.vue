<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :sort-by="['userId']"
    user-key="userId"
    :sort-asc="[true]"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>CRUD Users</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search with userId or Role"
          color="it-blue-lighten"
          single-line
          hide-details
        ></v-text-field>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-toolbar color="gg-red" dark flat>
              <v-card-title class="flex-grow-1 justify-center">
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
            </v-toolbar>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <v-row align="center">
                      <v-col cols="3">
                        <v-subheader>
                          <b>Role:</b>
                        </v-subheader>
                      </v-col>
                      <v-col cols="9">
                        <v-select outlined v-model="editedItem.role" :items="roles" label="Role"></v-select>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="it-blue-lighten" text @click="close">Cancel</v-btn>
              <v-btn color="it-blue-lighten" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click.stop="editItem(item)" color="it-blue-lighten">mdi-pencil</v-icon>
      <v-icon small @click.stop="deleteItem(item)" color="gg-red">mdi-trash-can-outline</v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      {
        text: "User Id",
        value: "userId",
        sortable: false,
        filterable: true
      },
      {
        text: "Name",
        value: "name",
        sortable: true,
        filterable: false
      },
      { text: "Email", value: "email", sortable: false, filterable: false },
      { text: "Phone", value: "phone", sortable: false, filterable: false },
      { text: "Address", value: "address", sortable: false, filterable: false },

      {
        text: "Birthday",
        value: "birthday",
        align: "center",
        sortable: true,
        filterable: false
      },
      {
        text: "Role",
        align: "left",
        value: "role",
        filterable: false,
        sortable: true,
        filterable: true
      },
      { text: "Actions", align: "center", value: "action", filterable: false }
    ],
    roles: ["User", "Staff", "Admin"],
    users: [],
    editedIndex: -1,
    editedItem: {
      role: ""
    },
    defaultItem: {
      role: ""
    }
  }),

  computed: {
    formTitle() {
      return (this.editedIndex = "Edit User Role");
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.users = [
        {
          userId: "001",
          name: "Le Thanh",
          email: "lethanh98@gmail.com",
          phone: "0123456789",
          address: "Truong Dinh, Hai Ba Trung",
          birthday: "26/06/1998",
          role: "User"
        },
        {
          userId: "002",
          name: "Duong Thoa",
          email: "duongthoa98@gmail.com",
          phone: "0123445566",
          address: "Dai La, Hai Ba Trung",
          birthday: "04/11/1998",
          role: "User"
        },
        {
          userId: "003",
          name: "Doan Dat",
          email: "doandat98@gmail.com",
          phone: "0336221717",
          address: "Phap Van",
          birthday: "28/04/1998",
          role: "User"
        }
      ];
    },
    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.users.indexOf(item);
      confirm("Are you sure you want to delete this user?") &&
        this.users.splice(index, 1);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem);
      } else {
        this.users.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>