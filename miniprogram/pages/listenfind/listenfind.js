const audio = require('../../utils/audio.js')
const db = require('../../utils/db.js')
const {shuffle} = require('../../utils/array_random.js')


Page({
  data:{
    words:[],
    random:[],
    skip:0,
    index:0,
    rightAnswer:''
  },
  onLoad () {
    wx.showLoading({
      title: '加载中...',
    })
   this.init();
  
  },
  // init 
  init () {
    const that = this;
    let finished = wx.getStorageSync('process').already;
  
    db.onQuery('cet_4', finished).then(res => {
      console.log(res.data);
      that.setData({ words:res.data });
      // console.log(that.data.words);
      this.generateAnswser();
    })
    // this.generateAnswser();
  },
  generateAnswser () {
    let arr = [];
    let i = this.data.index;
    let right = this.data.words[i];
    
    arr.push(right);
    let sk = this.data.skip + 3;
    db.onQuery('random', 3, sk).then(res => {
      // that.setData({ random: res.data })
      console.log(res.data);
      res.data.forEach(ele => {
        arr.push(ele);
      })
      let shuffle_arr = shuffle(arr);


      this.setData({rightAnswer:right._id,random:shuffle_arr,skip:sk});
      wx.hideLoading();
    });
   
  },
  play () {
    const word = this.data.words[this.data.index].word;
  
    const url = `http://dict.youdao.com/dictvoice?type=2&audio=${word}`
    let a = audio(url); 
    
    a.play();
  },
  judge (e) {
    let a = this.data.rightAnswer;
    // console.log(a);
    // console.log(e);
    let id = e.target.dataset.id;
    console.log(id);
    if(id === a){
      wx.showModal({
        title: 'tips',
        content: '正确',
      })
    }else{
      wx.showModal({
        title: 'error',
        content: '错误',
      })
    }
  },
  next () {
    let limit = this.data.words.length - 1;
    if(limit > this.data.index){
    this.setData({ index:this.data.index + 1 });
    this.generateAnswser();
    }else{
      wx.showModal({
        title: 'tips',
        content: '无可背单词',
      })
    }
  }
})