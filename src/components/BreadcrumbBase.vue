<template>
  <v-breadcrumbs :items="itemsBreadcrumb" class="px-0">
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      itemsBreadcrumb: []
    };
  },
  props: {
    //   fullPath: {
    //       type: String,
    //       required: true
    //   }
  },
  methods: {
    setBreadcrumb() {
      this.itemsBreadcrumb = [];
      let fullPath = this.$route.fullPath;
      fullPath = fullPath.split("/");
      this.itemsBreadcrumb.push({
        text: "Home",
        disabled: false,
        exact: true,
        to: "/home"
      });
      let to = '';
      for (let i = 1; i < fullPath.length; i++) {
        to = to + '/' + fullPath[i]
        this.itemsBreadcrumb.push({
          text: _.capitalize(fullPath[i]),
          disabled: i < fullPath.length - 1 ? false : true,
          exact: true,
          to: to
        });
      }
      // console.log(2 > fullPath.length - 1);
    }
  },
  created() {
    this.setBreadcrumb();
  },
  watch: {
    $route: "setBreadcrumb"
  }
};
</script>