const audio = require('../../utils/audio.js');
const time = require('../../utils/timeformat.js');
// const db = require('../../utils/db.js');
const {jsonformat} = require('../../utils/jsonformat.js');
const db = wx.cloud.database();
Page({
  data:{
        isplay:true,
        selected:'',
        answer:['A','B','C','D'],
        control:'Play',
        format:'00:00',
        total:'00:00',
        progress:0,
        question:'which question is true?',
        chioce:[],
        listen:[],
        current:0,
        total:0
  },
  onLoad(option){
    console.log(typeof option.type, typeof option.year);
    const that =this;
    db.collection('audio').where({
        type:option.type,
        year:option.year
      }).get().then(res => {
      console.log(res.data[0]);
      that.setData({ listen:res.data,total:res.data[0].ques1.length });
    })
  },
  play(){
    const that = this;
    
    // if(this.data.listen.length === 0){
    //   db.onQuery('listenning').then(res => {
    //     console.log(res);
    //   }).catch(err => console.log(err));
    // }

    // }

    // console.log(that.data.listen[that.data.current]);
    // let a = audio(that.data.listen[that.data.current].url);
    let a = audio(that.data.listen[0].url)
  
    if(this.data.isplay){
      a.play();

      // 进度条
      a.onTimeUpdate(t => {
        console.log(a.duration);
        console.log(time(a.currentTime,a.duration));
          that.setData({
            progress:time(a.currentTime,a.duration)
          });
      })


      this.setData({ control: 'Pause' })
    }else{
      a.pause();
      this.setData({ control: 'Play' })
    }
    this.data.isplay = !this.data.isplay;
  },
  getChioce1(e) {
    console.log(e);
    let chioce = e.target.dataset.chioce
    this.setData({selected:chioce})
    // console.log(chioce)
  },
  submit (e) {
    const that = this;
    console.log(that.data.listen[0].ques1);
    let ans = e.detail.value;
    let ques = that.data.listen[0].ques1[that.data.current];
    console.log(ques);
    let j = 0;
    let judge = true;
    for(let i in ans){
      console.log(ans[i]);
      console.log(ques[j].a)
      if(ans[i] !== ques[j].a){
        wx.showModal({
          title: 'error',
          content: '第'+ (j+1) +'题选择错误',
        });
        judge = false;
      }
      j++;
      if(judge){
        wx.showModal({
          title: 'tips',
          content: '全部答对',
        })
      }
    }
    // let ques = that.data.listen[that.data.current].ques.a;
    console.log(that.data.listen[that.data.current].ques);
  },


  next () {
    console.log('11');
    let cur = this.data.current + 1;
    if(cur < this.data.total){
      this.setData({ current: cur })
    }else{
      wx.showModal({
        title: 'tips',
        content: '已是最后一题了',
      })
    }
  }
})