<template>
  <ValidationObserver ref="observer" v-slot="{ invalid }" class="pa-5" tag="div">
    <ValidationProvider name="name" rules="required|max:50" v-slot="{ errors }" :bails="false">
      <v-text-field label="Name" v-model="comment.name"></v-text-field>
      <span class="red--text">{{ errors[0] }}</span>
    </ValidationProvider>
    <ValidationProvider name="comment" rules="required|max:300" v-slot="{ errors }" :bails="false">
      <v-textarea
        outlined
        v-model="comment.content"
        counter="300"
        label="Viết bình luận ở đây"
        :rows="2"
      ></v-textarea>
      <span class="red--text">{{ errors[0] }}</span>
    </ValidationProvider>

    <div class="mb-1">
      <v-btn color="primary" @click="submit" :disabled="invalid">Bình luận</v-btn>
    </div>
  </ValidationObserver>
</template>

<script>
import { productService } from "@/_api";

export default {
  data() {
    return {
      comment: {
        name: "",
        content: ""
      }
    };
  },
  computed: {
    productId() {
      return this.$route.params.productId;
    }
  },
  methods: {
    async submit() {
      const comment = this.comment;
      const productId = this.productId;
      try {
        const isSuccess = await productService.createComment(comment, productId);
        if (isSuccess) {
          this.$store.dispatch("alert/success", {
            message: "Add Successfully!"
          });
          const href = window.location.href;
          window.location.assign(href);
          // this.resetInput();
        }
      } catch (error) {
        if (error.response) {
          this.$store.dispatch("alert/error", {
            message: error.response.data.message
          });
        }
      }
    },
    resetInput() {
      this.comment.name = "";
      this.comment.content = "";
    }
  }
};
</script>