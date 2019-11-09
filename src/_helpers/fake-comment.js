export function fakeComments() {
    let all = [];
    for (let i = 0; i < 30; i++) {
      let d = new Date();
      let day = Math.floor(Math.random() * 31) + 1;
      let month = Math.floor(Math.random() * 12) + 1;
      let year = d.getFullYear();
      let time = `${day}/${month}/${year}`;
      all.push({
        username: "john" + Math.floor(Math.random() * 25) + 1,
        time: time,
        content:
          "Sản phẩm dùng đã được sử dụng 2 ngày, nhìn chung khá tốt, chưa có hiện tượng gì xảy ra. Dịch vụ tư vấn khá tốt. Cho 5 sao!!! <3 Sản phẩm dùng đã được sử dụng 2 ngày, nhìn chung khá tốt, chưa có hiện tượng gì xảy ra. Dịch vụ tư vấn khá tốt. Cho 5 sao!!! <3",
        
      });
    }
    return all;
  }