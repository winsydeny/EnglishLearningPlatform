const {currentAnswerIndex,wrongAnswerIndex} = require('../../utils/random.js');
const {onQuery} = require('../../utils/db.js');
Page({
  data:{
    words:[],
    number:1,
    answer:'',
    currentNum:'',
    chioces: ['ge','qq','事情']
    
  },
  getCurrentAnswer (e) {
      console.log(e); 
    let _id = e.target.dataset.id;
    if(this.data.words[this.data.currentNum]._id === _id){
      console.log("答案正确");

      wx.showModal({
        title: 'tips',
        content: '正确',
      })
    }else{
      console.log("错误");
      wx.showModal({
        title: 'tips',
        content: '错误，再试一次',
      })
    }

  },
  onLoad () {
    let process = wx.getStorageSync('process');
    if(process.already !== 0){


      const that = this;
      let index = currentAnswerIndex(3);
      let book = wx.getStorageSync('plan').chooseBook;

      onQuery('cet_4', 1,process.already).then(res => {
        that.setData({
          words: res.data,
          currentNum: index,
          number:process.already
        });
        console.log(res.data);
      }).catch(err => { console.log(err) });
    }else{
      const that = this;
      let index = currentAnswerIndex(3);
      let book = wx.getStorageSync('plan').chooseBook;

      onQuery('cet_4', 3).then(res => {
        that.setData({
          words: res.data,
          currentNum: index,
        });
        console.log(res.data);
      }).catch(err => { console.log(err) });
    }
    
    
  
    // current answer postion 

    console.log(this.data.words);
  },
  onShow () {

  },
  next () {
    const that = this;
    let index = currentAnswerIndex(3);
    let i = this.data.number;
    console.log('number:',i);
    let book = wx.getStorageSync('plan').chooseBook;
    this.setData({ number: i })
    
    onQuery('cet_4', 1,++this.data.number*3).then(res => {
      that.setData({
        words: res.data,
        currentNum: index,
      });
      console.log(res.data);
    }).catch(err => { console.log(err) });
    

    let p = wx.getStorageSync("process");
    p.already = this.data.number;
    wx.removeStorageSync('process');
    wx.setStorageSync('process', p);

  }
})