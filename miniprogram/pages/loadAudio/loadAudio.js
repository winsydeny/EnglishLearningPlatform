const db = require('../../utils/db.js');
const {index_id} = require('../../utils/random.js');
const {jsonformat} = require('../../utils/jsonformat.js');
Page({
  data:{
    r:null,
    num:1,
    chioce:['A','B','C','D'],
    pickerchoose:'',// 正确答案
    fromquestion:[
      {
        question:'',
        chioce:{A:'',B:'',C:'',D:''},
        answer:''
      }
    ]
  },
  onLoad(){
    const record = wx.getRecorderManager();
    this.setData({r:record});
  },
  formsubmit(e){
    console.log(e);
  },


  //选择正确答案
  bindPicker(e){
    console.log(this.data.chioce[e.detail.value]);
    let pick = this.data.chioce[e.detail.value];
    this.setData({pickerchoose:pick});
  },
  // 开始录音
  start () {
    let r = this.data.r;
    r.onStart(() => {
      console.log('recorder start')
    });
    r.start();
  },
  // 结束录音
  stop () {
    let r = this.data.r;
    let that = this;
    r.stop();
    r.onStop((res)=>{
      const {tempFilePath} = res;
      that.setData({ temp:tempFilePath });
      // console.log(res);
      wx.showModal({
        title: 'tips',
        content: '录音结束',
      })
    })


  },
  //添加问题
  add () {
    let n = ++this.data.num;
    this.setData({num:n});
    console.log(this.data.num);
  },
  submit(e){
    console.log(e);
    let uploads = true;
    const q = e.detail.value;
    let format = jsonformat(q);

    if(uploads){
      console.log("112");
    

      // const id = wx.getStorageSync('userinfo').nickName;
      const index = index_id();
      // console.log(index);
      wx.cloud.uploadFile({
        cloudPath: `audio/${index}.mp3`,
        filePath: this.data.temp,
        success: res => {
          // console.log(res);
          let obj = {
            url:res.fileID,
            ques:format
          }
          db.add(obj).then(res => {
            console.log(res);
            wx.showModal({
              title: 'tips',
              content: 'Success',
            })
          })
        }
      })

    }

    

  },
  
  //上传
  upload(){
    this.submit();
    // const id = wx.getStorageSync('userinfo').nickName;
    // wx.cloud.uploadFile({
    //   cloudPath: `audio/${id}.mp3`,
    //   filePath: this.data.temp,
    //   success: res => {
    //     console.log(res);
    //   }
    // })
  }
})