// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request-promise')
const sha256 = require('sha256')
const utf8 = require('utf8')
cloud.init();

// 云函数入口函数
exports.main =  (event, context) => {
  let getInput = (input) => {
    if (input.length == 0) {
      return null;
    }
    var result;
    var len = input.length;
    if (len <= 20) {
      result = input;
    } else {
      var startStr = input.substring(0, 10);
      var endStr = input.substring(len - 10, len);
      result = startStr + len + endStr;
    }
    return result;
  }
  var appKey = '4a03415786b20b2c';
  var key = '80XtzioUdADX3VxsXsMnGRnryOfKWXgz';//注意：暴露appSecret，有被盗用造成损失的风险
  var salt = new Date().getTime();
  var curtime = Math.round(new Date().getTime() / 1000);

  var query = utf8.encode(event.word);
  // var query = 'good';
  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  var from = 'auto';
  // var to = 'zh-CHS';
  var to = 'auto';
  var str1 = appKey + getInput(query) + salt + curtime + key;
  var sign = sha256(str1);
  
  


  let res = request(`http://openapi.youdao.com/api?q=${query}&appKey=${appKey}&salt=${salt}&from=${from}&to=${to}&curtime=${curtime}&sign=${sign}&signType=v3`).then(data => data).catch(err => err);


  return res;


}