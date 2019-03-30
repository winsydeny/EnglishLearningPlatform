const app= getApp();
Page({
  data:{
    notlogin:true,
    img:'',
    book:'无',
    day:0,
    precent:0,
    already:0,
    remaindays:0,
  },
  onLoad () {
    let user = wx.getStorageSync('userinfo');
    if(!user){
      wx.showModal({
        title: 'Tips',
        content: '请前往我的页面登录',
      });
    }else{

      this.setData({ img:user.avatarUrl,notlogin:false });
      if (!wx.getStorageSync("plan")) {
        // console.log("123");
        wx.showModal({
          title: 'INFO',
          content: '请先制定计划'
        })
      } else {

        // load last time progress
        this.setData({
          already: app.globalData.process.already,
          precent: app.globalData.process.precent,

        });
        // console.log(app);

        let plan = wx.getStorageSync("plan");
        // console.log(plan);

        // set limit for words 
        let total = 4500;
        if (plan.chooseBook === "CET-6") {
          total = 2080;
        }
        //calculate remian days from daily plan
        let remain = parseInt(total / parseInt(plan.daygoal));
        console.log(remain)
        this.setData({ book: plan.chooseBook, day: plan.daygoal, remaindays: remain });
      } 


    }

    
    
  },

  //update data 
  onShow () {
    let pro = wx.getStorageSync('process');
    let goal = wx.getStorageSync('plan').daygoal;
    let book = wx.getStorageSync('plan').chooseBook;
    let remain = wx.getStorageSync('plan').daygoal;
    let userinfo = wx.getStorageSync('userinfo');
    let pre = ((pro.already / 4500) * 100);

    let total = 4500;
      if (book === "CET-6") {
        total = 2080;
    }
    let remaining = parseInt(total / parseInt(remain));


   
    console.log( 'presss--',parseFloat(pre.toFixed(2)));
    // console.log(plan);
    this.setData({
      already:pro.already,
      precent: parseFloat(pre.toFixed(2)),
      day:goal,
      book:book,
      remaindays:remaining,
      img:userinfo.avatarUrl,
      notlogin:false
    })

  },
 // ***current onHide , when the project over it will be use onunload replace

  onHide () {
    let that = this.data;
    console.log(that.already);
    //calculate progress 
    let pre = ((that.already / 4500) * 100);
    console.log(pre.toFixed(2));
    wx.setStorageSync('process', { already: that.already, precent: parseFloat(pre.toFixed(2))});
    // const day = wx.getStorageSync('plan').daygoal;
    // wx.setStorageSync('dayalready',daygoal);

  },
  
  toPlan () {
    wx.navigateTo({
      url: '../schedule/schedule',
    })
  },
  startWords () {
    if(wx.getStorageSync('plan')){
      wx.navigateTo({
        url: '../words/words',
      })
    }else{
      wx.showModal({
        title: 'tips',
        content: '请先制定计划',
      })
    }
  },
  search(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  reading () {
    wx.navigateTo({
      url: '../reading/reading',
    })
  }

})