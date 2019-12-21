<template>
  <v-footer absolute padless app dark>
    <v-card flat tile width="100%">
      <v-row no-gutters>
        <v-col cols="6" class="text-center">
          <v-card-text>
            <b>Công Ty Cổ Phần Thương Mại - Dịch Vụ Bách Khoa</b>
          </v-card-text>
        </v-col>
        <v-col cols="6" class="text-center">
          <v-card-text>
            <b>Địa chỉ: Số 1, Đại Cồ Việt, Hai Bà Trưng, Hà Nội</b>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="6" class="text-center">
          <v-card-text>© 2016 - 2019 /GPĐKKD số 0123456 do Sở KHĐT TP.HN cấp</v-card-text>
        </v-col>
        <v-col cols="6" class="text-center">
          <v-card-text>Hotline: 01238888</v-card-text>
        </v-col>
      </v-row>
      <!-- <v-card-text class="white--text">
        2016 - {{ new Date().getFullYear() }}
        <span></span>GPĐKKD số 012345678 do Sở KHĐT TP.HN cấp
      </v-card-text>-->
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    // icons: [
    //   'mdi-home',
    //   'mdi-email',
    //   'mdi-calendar',
    //   'mdi-delete',
    // ],
    // items: [
    //   'default',
    //   'absolute',
    //   'fixed',
    //   'app'
    // ],
    padless: true,
    variant: "default"
  }),
  computed: {}
};
</script>

<style lang="scss" scoped>
.v-card {
  background-image: linear-gradient(0.25turn, #00bda0 30%, #007ddd);
}
</style>