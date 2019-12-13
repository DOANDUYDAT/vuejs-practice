export function formatCurrency(total = 0) {
  let total_str = total.toString();
  // number là số lượng phần tử trong 1 block
  let number = 3;
  let total_block = Math.floor(total_str.length / number);
  let start = total_str.length - total_block * number;
  // tiến hành phân cụm 
  let temp = [];
  for (let i = start; i < total_str.length; i += number) {
    temp.push(total_str.substr(i, number));
  }
  let result = '';
  if (start > 0) {
    result = total_str.substr(0, start) + '.' + temp.join('.');
  } else {
    result = temp.join('.');
  }
  return result;
}