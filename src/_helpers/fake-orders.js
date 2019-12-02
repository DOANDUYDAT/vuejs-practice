export function fakeOrders() {
    let all = [];
    const status = ['Đang giao hàng', 'Đã xác nhận', 'Hoàn thành']
    for (let i = 0; i < 30; i++) {
        let d = new Date();
        let day = Math.floor(Math.random() * 31) + 1;
        let month = Math.floor(Math.random() * 12) + 1;
        let year = d.getFullYear() - Math.floor(Math.random() * 5);
        let time = `${year}/${month}/${day}`;
        all.push({
            orderId:  i + 1,
            userId:  Math.floor(Math.random() * 1000) + 1,
            username: "john" + Math.floor(Math.random() * 25) + 1,
            staffId: Math.floor(Math.random() * 100) + 1,
            date: time,
            status: status[Math.floor(Math.random() * 3)]
        });
    }
    return all;
}