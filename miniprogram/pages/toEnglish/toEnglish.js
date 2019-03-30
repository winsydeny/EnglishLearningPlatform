const db = require('../../utils/db.js');
Page({
  data:{
      list:[],
      current:0,
      number:1,
      answer:[]
  },
  onLoad () {
    const that = this;
    wx.showLoading({
      title: '加载中...',
    })
    let review = wx.getStorageSync('process').already;
    db.onQuery('cet_4',review).then(res => {
      console.log(res.data);
      that.setData({ list:res.data });
      this.getRandom();

    });

  },
  getRandom () {
      const that = this;
      const c = that.data.current;
      const right = that.data.list[c].word;
      // console.log(right);
      let sk = c * 3 + 26;
      let arr = [];
      arr.push(right);

      db.onQuery('cet_6',3,sk).then(res => {
        console.log(res);
        res.data.forEach(ele => {
          arr.push(ele.word);
        })
        that.setData({ answer:arr })

        wx.hideLoading();
      });
  },

  getCurrentAnswer(e){
    console.log(e);
    if(e.target.dataset.id === this.data.list[this.data.current].word){
      wx.showModal({
        title: 'success',
        content: '正确',
      })
    }else{
      wx.showModal({
        title: 'error',
        content: '错误!!!',
      })
    }
  },



  next () {
    const limit = this.data.list.length - 1;
    if(limit > this.data.current){
      this.setData({ current: this.data.current + 1 });
      this.getRandom();
    }else{
      wx.showModal({
        title: 'tips',
        content: '已经是最后一个了',
      })
    }
   
  }
})


