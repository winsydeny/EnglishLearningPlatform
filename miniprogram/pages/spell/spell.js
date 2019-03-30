const {sliceWord} = require('../../utils/slice.js')
const db = require('../../utils/db.js')
const {word} = require('../../utils/random.js')
const { shuffle } = require('../../utils/array_random.js')
Page({
  data:{
    wordlist:[], 
    index:0, //当前的单词索引
    show:'', // 当前单词
    answer:[], 
    rightAnswer:'' 
  },
  onLoad () {
    this.init();
  },
  init () {
    const that = this;
    let finished = wx.getStorageSync('process').already;
    // console.log(finished);
    db.onQuery('cet_4',finished).then(res => {
      // console.log(res.data);
      res.data.forEach(ele => {
        that.data.wordlist.push(ele.word);
      })
      that.generate();
    })
  },
  // 生成单词的空缺
  generate () {

    const that = this;
    let i = that.data.wordlist[that.data.index];
    let rs = sliceWord(i);

    let head = i.slice(0,rs);
    let right = i.slice(rs,rs+2);
    let tail = i.slice(rs+2,i.length);
    // console.log(head,right,tail);
    that.setData({ show:head+'_ _'+tail,rightAnswer:right });
    console.log(that.data);

    // 随机生成答案
    let answer = [right];
    
    for(let index = 0;index < 2; index ++){
      let random_word = this.randomAnswer();
      answer.push(random_word);
    }
    // answer.sort(); 

    let shuffle_array = shuffle(answer);
    that.setData({ answer:shuffle_array });
    // console.log(random_word);
  },
  randomAnswer () {
    let rs = '';
    for(let i = 0;i<2;i++) {
      rs +=  String.fromCharCode(word(122,97));
    }
    return rs;
  },
  next (e) {
    
    let that = this.data;
    this.setData({index:that.index + 1})
    let limit = that.wordlist.length;
    console.log(limit,that.index)
    if(limit > that.index){
      this.generate();
    }else{
      wx.showModal({
        title: 'tips',
        content: '已经是最后一个了',
      })
    }

  },
  judge (e) {
    let r = e.target.dataset.a;
    if(r ===  this.data.rightAnswer) {
      wx.showModal({ title: 'tips', content: '答案正确', });
    }else{
      wx.showModal({ title: 'tips',  content: '答案错误！！！', });
    }
  }
})