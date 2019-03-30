Page({
  data:{
      userinfo:null,
      logined:false
  },
  onLoad () {
    let user =  wx.getStorageSync('userinfo');
    if(user){
        // console.log(user);
        this.setData({ logined:true,userinfo:user });
    }else{
        console.log("no user");
    }
    console.log(this.data.userinfo)
  },

  login (info) {
    console.log(info.detail);
    let raw = JSON.parse(info.detail.rawData);
    let user = {
      nickName:raw.nickName,
      avatarUrl:raw.avatarUrl
    }
    // let user = info.detail.rowData;
    wx.setStorageSync('userinfo', user);
    this.setData({ logined: true,userinfo:user });
    // console.log(this.data.userinfo);
  }
})