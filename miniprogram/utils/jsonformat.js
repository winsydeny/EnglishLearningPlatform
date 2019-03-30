const jsonformat = (data) => {
  // console.log(data);
  let len = 0;
  for(let i in data) len++;
  // console.log(len);
  let questionNum = len/6;
  let array = [];
  let cal = 1;
  for(let i = 0;i<questionNum;i++)
      array.push({});
  for(let item in data){
    let js = item.match(/^[A-Za-z]?/)[0];
      if(cal <= 6)
        array[0][js] = data[item];
      if(cal <=12 && cal > 6)
        array[1][js] = data[item];
      if(cal <= 18 && cal > 12)
        array[2][js] = data[item];
      if(cal <= 24 && cal >18)
        array[3][js] = data[item];
      cal++;
  } 
  // console.log(array);
  return array;
}
module.exports = {jsonformat};