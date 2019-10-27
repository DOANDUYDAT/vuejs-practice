<template>
 <v-dialog v-model="dialog" max-width="800px">
    <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
         <v-icon>mdi-cart-plus</v-icon>
        </v-btn>
    </template>
      <v-card flat>
      <v-toolbar color="primary" style="width=500px" >
        <v-card-title class="layout justify-left">
          <span class="">GIỎ HÀNG CỦA BẠN</span>
        </v-card-title>
         <v-card-actions>
              <v-btn class="right" @click="checkout">Tiếp tục mua sắm</v-btn>
        </v-card-actions>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-simple-table class="table">
	                <thead>
	                    <tr>
	                        <th class="text-center">HÌNH ẢNH</th>
                            <th class="text-center">TÊN SẢN PHẨM</th>
	                        <th class="text-center">ĐƠN GIÁ</th>
                            <th class="text-center">SỐ LƯỢNG</th>
	                    </tr>
	                </thead>
	                <!-- <tbody>
	                    <tr v-for="(sp,index) in dsmua">
	                        <td>{{sp.masp}}</td>
	                        <td><label class="label label-danger">{{sp.title}}</label></td>
	                        <td><img :src="sp.image" class="class_img"/></td>
	                        <td><input type="int" class="form-control" :value="sp.slmua"/></td>
	                        <td><span class="label label-danger">{{sp.price}}</span></td>
	                    </tr>
	                </tbody> -->
                    <tbody>
                        <tr>
                            <td><v-img :aspect-ratio="4/5" src="data:image/jpeg;base64,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"></v-img></td>
                            <td><strong>Sam sung Galaxy M20 </strong></td>
                            <td>5000000 <sup>đ</sup></td> 
                            <td> <v-card flat class="py-12">
                                <v-card-text>
                                <v-row align="center" justify="center">
                                <v-col cols="12"></v-col>
                                <v-btn-toggle v-model="toggle" mandatory>
                                <v-btn><span>-</span></v-btn>
                                <v-btn><span>1</span></v-btn>
                                <v-btn><span>+</span> </v-btn>
                                <v-btn><v-icon>mdi-delete-forever</v-icon> </v-btn>
                                </v-btn-toggle>
                                </v-row>
                                </v-card-text>
                                </v-card>
                            </td>   
                        </tr>
                        <tr>
                            <td><v-img  :aspect-ratio="4/5" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBIQEBAQEBAVEhAQDxAQFRAPDxAPFRUWFhURFRUYHSggGBolGxUVITEhJikuLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGislHR4tLS0tLS0tLS0tLS0tMS0uLS0tLSstLSstLSsrKystLSstKy0tLS0tKy0tNzctLS0tK//AABEIAMIBAwMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAwECBAUGBwj/xABOEAACAQICBAUNCwsDBQAAAAAAAQIDEQQhBQYSMUFRYXGRExQiJDI0UnKBkqGx0QcXI1NzdIOTsrTCFTNCYmOCwcPT4fBUotIWJURVlP/EABkBAQADAQEAAAAAAAAAAAAAAAABAgMEBf/EACURAQACAQQCAQUBAQAAAAAAAAABAhEDEjEyIVGBBBMiM3FhQf/aAAwDAQACEQMRAD8A9vAAAAAAAAAAAC5TaXGgKgptLjQ2lxoCoKbS40NpcaAqCm0uNFJVYpXcklxtpIC4EHXtL42n58faOvaXxtPz4+0CcGP19R+Np+fD2levaXxtPz4+0CcEHXtL42n58PaOvaPxtPz4+0CcEHXtH42n58faFjKTyVWm348faBOAAAAAAAAAAK3KAAAAAAAAAACHEVGrJb27X4lwv/OMmMTGX24Wdsp8F/BItwmOWNXcb7tp8bzfSyByj4K6BWg7916P7kTg+P0f3MctohfKcfBXQiOU4+CuhFJRfGuj+5BXlsxlKUkoxTlJtZKKV29/EQeEspx8FdCI5Sj4EehHMT150d/qXz9SrW9Rv6UlOMZwkpRlFSjJLJxaunv4iZiY5ImJ4W4/FU6VOdSUE1CMpNJK7twLle48q1m0xKVWUXGE6idpzaUoQlw06UXlGK3bVtqTV78B6LrNFrC1c9yjwW/TieSY3C1ZVJyVKo05zaahNpq7zTtmaaeMZlnqZziEDxcuKHmU/YWvFy4oeZT9hd1lW+Jq+ZP2FrwVb4mr9XP2Gm6PamJR9dybSfU4q6Tk6cGop8LtG+XIZ9SjQ/8AYYb/AOar/wACHCUZwctvC1aicdmzhNWd1mm4v/GXzqvL/t0u6cnalJ3vtZJbGS7L0LiG6PZiWNjlThTlOnjcPWkrWpxw84SldpOzcbZLPPiNT+Uan7P6un7DZVNuyX5Pqbo59Sm3dNNvuOHNGrqYGu5NrDYhJttJUatkm93ckboMSr+UZ/s/q6fsKLSM+FU3yOnTa9RZ+T6/+nxH1VX/AIlOsa/xFf6qr7Buj2Yl6x7k+udVVaeHqSk6E5qjsSbmqFWSbpypt5qEmnFxzSbi1a7Paz5g1BozhjKO3CcL4nAW24yhftqle10fT4AAAAAAAAAAAAAAAAAAADFxfdw5peuJlGJi+7hzS9cStuE15YdbeyKRJWebIZMxbLWarWSnKWDxUYq8nh66ilvcnTlZI2bZZIJfM+IxS7mz2r+Xmtvue86IwtT8nYeld059bYeMt21FqMdpZ5XtdZm8kiyRe99ylaYc1pei6OBrp3s5Q2YuW24KU4K21vlnffmTaJ/MU/ERJrhFvB1LcdF+RVYXZZohfAUvERhrdI/rbR8X+GUVLkisYN7l/BLnfAcmHTlagXKm81xb75JeUq42/hazTIwZWWLJJk8Ytuy38RiVKjkuxslu2pOEH5LspIjr1tnlfF7TEVVrayTbTV3dtX4VylZx/wA3+nhI2jGZlr4wwNLYh1dIYGclFN4jDZRVo5YrCrd5D2U8UxnfuA+cUPvWGPaz2vpf1R8vL1/2SAA3ZAAAAAAAAAAAAAAAABh419nDml64mYa/Gv4aHiP7SK24WryxKzzZC2X15ZkTZi2GWNlWyxsCjZa2VbLGyEtPrbO2Dq8vU101Iopoddr0vEiW64RbwdW3HSfkVSDZJoRdrUfk4+opq9I/qdOfy+GVYugs1zouUStjmb5UnHsnzv1kVaslaMc2rvkzWb5rf5mUxGIccovsnvdou1+fhMObk2lZeRRSu+VE4zwjPtlUYy2ocLcoNvKyV01FehvycTMZNbKi4t2beUkt6Sa3PiKwUlaS501nuCk0rZcl1GVua6M7RhMSgr07PLdaLXM0mr8tmQMyKueb38LIJIwmGkS1GPdsbgL/AOoofesMe1Hh2nH2zg/laX3rDHuJ7H0v6oefr/skABuyAAAAAAAAAAAAAAAADXaRVqlN8k15LxZsTW6VfZ0v3/wlbcLV5YFaWbImytV5kbZi2RYxScJKDallZp2e9X9F+LnW8186WKafZWbjTstpNRcVT2s7cL6pfmRtGy1sJap0cVZLbz2Kqb2lZTe3sPdyw6OC3ZJUsTdNTsmpXTaybdRx4OC9NeTkz2dygGj08prAVVO+1bj2nbqitd81jK0D3tR+Th6iPWrvOt4sftxJtArtWh8lD1FNTr8lezNsWV6ihG75lysnSOW1q0xsT6lCzqJLmhtZ7TXNay5/LnTTm84ha14rGZV0hiJ9zTW1UluvbsVfOpLk/iTYSlJRSbfS3maHQVZRjOcntTnJuUnm2o9il6+k2FTTVNPZUtqXBCCc5vmjHM1tTb4Vi+7y3KVuH08HER1KqRhUli6vcUJQT/Srvqf+1Xl6DJjq/Ul+dry8WklBdMr36DmtVpEoJ4lcZWk9vuU5eLmbHDaBoQz2Np8dRup6HkvIbFQSVkrGE6bSLuJ0xhGsZo9TWUq9FWvwddYXi5z2c8n1m790b84pfesKesHqfTxjTiHFqzm8gANmYAAAAAAAAAAAAAAAAarTL7OjzVPwm1NPp5/CUfpfwFbcLU5a6q8yy4qyzLNowbrmyly1soBdcoUuUuBq9an2nW8WP24mVq+u1aHyUPUYmtXedbxY/bia2trC8PhsLh6CjPF1KMHFSzhRhb87UXDyR4fXbZN4iK+1LWivmfTa6waw0MGrSe1WkvgqEbucm917dzG/D0JnmcqOLxM5VJz2HUk5Sk1m78UeBWsrZbkdNgcIqfVqsm6mIkm5V52dSUpZJrgit2SyysKMEmdenpxpRiOfbljV+7P+MvVzU6g6UJ1p1a0mruMpONNO73RjZ9LZ1uEwdKitmlThTXFCKjfo3mJq7FzorgSlNPz3b0WN5Gmo7unhOPUzM+XbXEQx1Tb5C5U1zkrIZyMZhbK2RG0XMtbKzCYcrrR37o35xS+9YQ9YPJ9aH27o35xS+9YQ9YOzS6Q5tTtIADRQAAAAAAAAAAAAAAAANJrC/hKH0v4Ddmi1kfwlD6X8BW/C1OzV1HmUuWzeZRMwluuuVLdoXIFQUuANXrV3nW8WP24nJatYDN1ZNynNvN5tQTtGK5EkkdZrV3nW8WP24mn0DH4KD5Dp0LYiXL9TXOIX6bouFPqi4NnaX6t1mYWC7O0l3Kau+B34DoNI09qhUXDsSa50rr0o0mAwrowVFu8ZK8ZcVRq8o+tro4Eb1tmHPWu3h1erVS3VIcsai5pR2bf7PSbtnI6CxNqsG/0lKnLn3r0xt5TqZVDl1K+XoUnME2RNlJSLWzLa0JMsZVlGVmFnL6z9+6N+cUvvWEPWDybWbv3Rvzil96wp6ydGn1hy6naQAF1AAAAAAAAAAAAAAAAA5/Wh/CYf6X8B0Bzutb+Ew/038srfqtTs1MnmNosnLMXMHQvTK3I0y5MgXgtuLga3Wh9p1vFj9uJqNBP4Kn4qNrrQ+063ix+3ExsLhrYbD1ludGlGp0JRl/DoNqTiFJrEzhk4uV6U1xxcfJLJ+hsxMLRVWhsTvdJQbXdKUbbM0+PJO/GZEs49BHQ7GXI8nz8DN44YWphqMDipqpOlUsq0WpO2UZSja1SK4mtl24M0d3RrKcYzW6SUl5eA4jWbDtKOJp/nKWb/AFqfCnzXfkbN9qppCNak0nud0uKMs7dN+lEakZjLTRnH4t2UYZaYYdAUZUoyuEuX1l790b84pfesKesnk2s3fujfnFL71hT1k1rw5dTtIACygAAAAAAAAAAAAAAAAc1re/hMP9N/LOlOX1zfZ4b6b+WUv1Xp2hppSzLkyHazLkzB0JkytyJSK3AkuVuWKRW4Gu1o7zreLH7cTN1es8HQTV06ME09zVs0YGs77TreLH7UTN1dfatD5KHqNI6q4/JiY3Duk7b4PuX+F8pFGVzf1KaknGSunvRoMRhnTdt64/aa1sviLLpbrPPga4GjmdEYr8n4xxk7Ub7MuH4Co+xn+7JWfJFnRRmaTWLCqUVPhjdPlpysn0Oz5rm1ZifDl1KTWcw9BuUOc1J0n1Wj1Gb+EpWWe909y6PU4nRmExicOitt0ZCjKlGRhZy+s3fujfnFL71hT1k8n1l790b84o/esIesFo4c2p2kABKgAAAAAAAAAAAAAAAAcpru+zw30/8ALOrOR17fZ4X6f+WUv1X0+0NHfMuTIFLMvUjB0p1IuTIFIujIITJlyZGpFUwMDWfvSt4sftRMvV59q0PkoeowdZX2pW8WP2ol+iK6jhsKnLYi6cLvLgirb9yuy0220zLO94pm0+m+TIMZD9K1+Br+Jj4DETc5wnFxsotXs8nyoz+RltO26uVtLUjUrvhpcRRSV4Qz55Po4zCrVISTUqaad005S3NWayNxiKew+R7n/AwsXhlJXWUvXzmsThtti0eXM6L0hHD4mEupqPZ9Tqy2pZ05ZNtPiupfuo9Hb5EeVabpONR3VrrslyrK/Q4no+isT1WhSqcMqcG/Gt2XpuaanmIllWm3wzClyhFisf1J0oqhKr1SVpSV+xKVpNpxCbWxDn9ZO/dHfOKP3rCnrB5TrMl19o+27rmlbh/8rCnqwc9+wAAoAAAAAAAAAAAAAAAAHH6/ytPC8H5/+Wdgctr9hZSpU60U31Kb27cFOaScvI1HyXK3j8Vqdocl1RX7pdKLlVXGulESq34S9TOZ1JFVXGulF6rLjXSiyLZekyRcqy410ovVZca6UUjBkihLiCGr1kqp4Stmn2K4f1onndTX/FU11uqOEnTpvYg5wrOVo5Jtqos7cR6fpbATrYerSjlKUJKLe7a3xvyXSPDtMYOcKk24yScndNZwn+lCXE07m2niYwx1XSUfdMxlNWhQwUVw9hX/AKpL76uP+KwXmV/6px+DxLp3aT2nZKS2LpZ3XZRlvuuhEeIqOc5Tta7vZbkaYhnW01jEO198/Hz7HqGDldpJRp4hycnkkkqubuZi1p0xw4Sh5YVU+jquRxGia/UqsZtyitmrByh3cOqU509uOazjt7S5i+OjqXx+Ht4mLXoVHInC33bR/wBdFpfT+PqRTrYalBRz2406uSeVm9tpLMl0b7oOMoUo0o08K4xvZzhWcs25Z2qLj4jR4KFOhJ1FVp1Go1IqnThXTntwlBxk5wilHss827K1jCUB/iPuW9uz983HfFYPzK/9Ukh7qWkUrKGFS8Sv/VOPoT2b5Xv4n4ostlm20rXbaS3LkQwb7O60LrLXx+NwrrxpRcMThdnqSnG+3iaLe1tSlfuV6T6CPAfcy1fnUxVK8WpKrSxE1n8FQpNzi5cTnUUEk87Rk9x78Fc5AAQAAAAAAAAAAAAAAAAAfEABpa+quDm9pU3Bvf1OUoR83cvIiNapYX9p5/8AY3wK7YW3T7aT/pbDcVRfvsr/ANMYf9p539jdAbY9G6fbULVzD8U/PZVavUP2nnG2BO2PRun21a0DQ/X841elNQNH4mW3Vpz293VIVJ05tLgk422lz3OoAiIhEzMuI96vRfg4j66oPer0X4OI+uqHbglDifes0Z4OI+uqFV7l2jPBxH11Q7UAcX71+jPBxH11Qr72OjfBxH11Q7MAcZ72OjfBxH11Quj7mujk+5r/AF1Vep3OxAGFonRVDCU+p4elGnC93bNyl4UpPOT5WzNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//Z"></v-img>
                            <td><strong>Sam sung Galaxy J7 </strong></td>
                            <td>4000000 <sup>đ</sup></td>
                            <td><v-card flat class="py-12">
                                <v-card-text>
                                <v-row align="center" justify="center">
                                <v-col cols="12"></v-col>
                                <v-btn-toggle v-model="toggle" mandatory>
                                <v-btn><span>-</span></v-btn>
                                <v-btn><span>1</span></v-btn>
                                <v-btn><span>+</span> </v-btn>
                                <v-btn><v-icon>mdi-delete-forever</v-icon></v-btn>
                                </v-btn-toggle>
                                </v-row>
                                </v-card-text>
                                </v-card>
                               
                            </td>
                        </tr>
                    </tbody>
                 </v-simple-table>
                        <v-card-title class="layout justify-center">
                            <label>Tổng tiền:</label>
                            <span class="fs-ghrttpri" data-tongtien="9000000">9.000.000<sup>đ</sup></span>
                        </v-card-title>
          <v-col md="6" offset-md="3">
            <v-card-actions>
              <v-btn color="primary" class="layout justify-center" @click="checkout">ĐẶT HÀNG</v-btn>
            </v-card-actions>
          </v-col>
        </v-container>
      </v-card-text>
    </v-card>	   
 </v-dialog>
	</template>
	// <script>
	//     export default{
	//         data(){
	//             return {
	//                 dsmua:[],
	//                 thongtin:{},
	//                 a_check:false
	//             }
	          
	//         },
	//         created:function(){
	//             this.load_dsmua();
    //    },
	//         methods:{
	//             load_dsmua(){
	//                 this.axios.get("https://localhost:8000/cart-list").then((response)=>{
	//                     this.dsmua=response.data;  
	//                     console.log(this.dsmua);
	//                 })
	//             },
	//             dathang:function(){
	                 
	//                 this.axios.post("https://localhost:8000/sanpham",this.thongtin).then((response)=>{
	//                     var result = response.data;
	//                     if(parseInt(result.success)>0){
	//                         console.log(result.success);
	//                         this.a_check=true;
	//                     }
	//                     	 	                })
    //         }
	//         }
	//     }
	// </script>
