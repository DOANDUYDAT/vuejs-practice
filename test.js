

// let a = 22100000;
// let astr = a.toString();
// let my_arr = astr.split('');
// console.log(my_arr)
// // let lena = astr.length;
// let total = [];
// let my_arr_reverse = my_arr.reverse();
// console.log(my_arr_reverse);

// let my_arr_reverse_str = my_arr_reverse.join('');
// console.log(my_arr_reverse_str);
// for (let i = 0; i < my_arr_reverse_str.length; i += 3) {
//     total.push(my_arr_reverse_str.substr(i, 3));
// }

// console.log(total);
// let total_reverse = total.reverse();
// console.log(total_reverse);
// let result = '';
// result = total_reverse.join('.');
// console.log(result);

let b = 205000;
let b_str = b.toString();
let b_du = Math.floor(b_str.length / 3);
let b_start = b_str.length - 3 * b_du;
console.log(b_du);
let total = [];
for(let i = b_start; i < b_str.length; i += 3) {
    total.push(b_str.substr(i, 3));
}
let result = '';
if (b_start > 0) {
    result = b_str.substr(0, b_start) + '.' + total.join('.');
} else {
    result = total.join('.');
}
console.log(result);