Page({
  data:{
    finished:0
  },
  onShow(){
    let process = wx.getStorageSync('process');
    console.log(process);
    this.setData({finished:process.already});
  },
  alreadywords(){
    console.log("words");
    // wx.navigateTo({
    //   url: '../finish/finish',
    // })
  },
  listen(){
    wx.navigateTo({
      url: '../chooselisten/chooselisten',
    })
    console.log("listen");
  },
  loadAudio(){
    wx.navigateTo({
      url: '../loadAudio/loadAudio',
    })
  },
  toenglish () {
    wx.navigateTo({
      url: '../toEnglish/toEnglish',
    })
  },
  spell () {
    wx.navigateTo({
      url: '../spell/spell',
    })
  },
  listenfind  () {
   
  }
})