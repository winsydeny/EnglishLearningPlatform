const db = wx.cloud.database();
/**
 * sk: skip() movenumeber
 */
const onQuery = (dbs, l = 1,sk = 1) => {
  if(sk === 1){
    return db.collection(dbs).where({}).limit(l).get();
  }
  console.log(sk);
  return db.collection(dbs).where({}).skip(sk).limit(3).get();
}
const add = (d) => {
  return db.collection('listenning').add({ data:d  });
}

module.exports = {onQuery,add};