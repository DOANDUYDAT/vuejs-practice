export function formatCurrency(total = 0) {
  let total_str = total.toString();
  // number là số lượng phần tử trong 1 block
  let number = 3;
  let total_block = Math.floor(total_str.length / number);
  let start = total_str.length - total_block * number;
  // tiến hành phân cụm 
  let temp = [];
  let result = '';
  if( total_str.length <= number) {
    result = total_str;
  } else {
    for (let i = start; i < total_str.length; i += number) {
      temp.push(total_str.substr(i, number));
    }
    if (start > 0) {
      result = total_str.substr(0, start) + '.' + temp.join('.');
    } else {
      result = temp.join('.');
    }
  }
  // if (start > 0) {
  //   result = total_str.substr(0, start) + temp.join('.');
  // } else if (temp.length > 1 && start <= 0) {
  //   result = temp.join('.');
  // } else {
  //   result = temp.join('');
  // }
  return result;
}