<template>
  <slide-image-product :product="product"></slide-image-product>
</template>

<script>
import SlideImageProduct from "./SlideImageProduct";

export default {
  data() {
    return {
        product: {}
    };
  },
  components: {
    SlideImageProduct
  },
  mounted() {
    this.product = {
      id: 0,
      inventory: 100,
      title: "Điện thoại SAMSUNG Galaxy Note 10 (Bạc)",
      gia_niem_yet: 22990000,
      gia_khuyen_mai: 21990000,
      gia_ban_le: 22990000,
      images: [
        "https://file.services.teko.vn/media/14/1/1566006602.9511392_190800499.jpg",
        "https://file.services.teko.vn/media/86/42/1566006603.197933_190800499-.jpg",
        "https://file.services.teko.vn/media/62/22/1566006603.4493387_190800499-1.jpg",
        "https://file.services.teko.vn/media/8/26/1566006603.6469312_190800499-2.jpg",
        "https://file.services.teko.vn/media/51/91/1566006603.8728101_190800499-3.jpg",
        "https://file.services.teko.vn/media/10/88/1566006604.0197575_190800499-4.jpg"
      ],
      thong_so_ky_thuat: {
        thong_tin_chung: {
          thuong_hieu: "SAMSUNG",
          bao_hanh: "12 tháng",
          mo_ta_bao_hanh: "",
          nhom_san_pham: "Điện thoại",
          ten: "Galaxy Note 10",
          mau_sac: "Bạc"
        },
        man_hinh: {
          loai_man_hinh: '6.3" Dynamic AMOLED',
          do_phan_giai: "Full HD+ (1080 x 2280 Pixels)"
        },
        camera: { camera_sau: "16MP", camera_truoc: "10MP" },
        cau_hinh: {
          chip: "Exynos 9825",
          ram: "8GB",
          bo_nho_trong: "256GB",
          pin: "3500 mAh",
          he_dieu_hanh: "Android 9.0",
          cong_sac: "USB Type-C",
          loai_sim: "2 Nano SIM"
        }
      }
    };
  }
};
</script>