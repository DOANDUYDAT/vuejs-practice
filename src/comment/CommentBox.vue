<template>
  
    <ValidationObserver ref="observer" v-slot="{ invalid }" class="pa-5" tag="div">
      <ValidationProvider name="name" rules="required|max:50" v-slot="{ errors }" :bails="false">
        <v-text-field label="Name" v-model="name"></v-text-field>
        <span class="red--text">{{ errors[0] }}</span>
      </ValidationProvider>
      <ValidationProvider
        name="comment"
        rules="required|max:300"
        v-slot="{ errors }"
        :bails="false"
      >
        <v-textarea outlined v-model="comment" counter="300" label="Viết bình luận ở đây" :rows="2"></v-textarea>
        <span class="red--text">{{ errors[0] }}</span>
      </ValidationProvider>

      <div class="mb-1">
        <v-btn color="primary" @click="submit" :disabled="invalid">Bình luận</v-btn>
      </div>
    </ValidationObserver>
  
</template>

<script>
export default {
  data() {
    return {
      name: "",
      comment: ""
    };
  },
  methods: {
    submit() {
      console.log("submit");
    }
  }
};
</script>