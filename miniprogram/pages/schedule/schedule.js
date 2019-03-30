Page({
    data:{
      date:'2019-3-20',
      books:["CET-4","CET-6"],
      chooseBook:'请选择',
      daygoal:'',
      startTime:'',
      percent:0,
      already:0
    },
  choose (e) {
    console.log(e);
    let val = this.data.books[e.detail.value];
    this.setData({
      chooseBook:val
    })
  },
  dayGoal (e) {
    this.setData({ daygoal:e.detail.value });
    // console.log(e);
  },
  DateChange (e) {
    console.log(e);
    this.setData({ startTime:e.detail.value });
  },
  finished () {
    let t = this.data;
    if(t.chooseBook === "请选择"&&t.daygoal === ""&&t.startTime === ""){
      wx.showModal({
        title: 'error',
        content: '请填写完整',
      })
    }else{
      if(t.chooseBook === "CET-4" && t.daygoal >= 4000){
        wx.showModal({
          title: 'error',
          content: '超出每日限制',
        })
      }else if(t.chooseBook === "CET-6" && t.daygoal >= 3000){
        wx.showModal({
          title: 'error',
          content: '超出每日限制',
        })
      }else{
        let _userplan = {
          chooseBook: t.chooseBook,
          daygoal: t.daygoal,
          startTime: t.startTime
        }
        wx.setStorageSync('plan', _userplan)
        wx.showModal({
          title: 'INFO',
          content: '计划制定成功',
        })

        // wx.navigateBack({})
      }
      
    }
  }
})