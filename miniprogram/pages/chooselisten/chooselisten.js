Page({
  data:{
    tabs:['听力真题','听音选意'],
    currentIndex:0
  },
  tolisten (e) {
    // console.log(e)
    let t = e.currentTarget.dataset.type;
    let y = e.currentTarget.dataset.year;
    // console.log(t,y)
    wx.navigateTo({
      url: `../listen/listen?type=${t}&year=${y}`,
    })
  },
  listenfind () {
    wx.navigateTo({
      url: '../listenfind/listenfind'
    })
  },
  tabSelect (e) {
    let id = e.target.dataset.id;
    // console.log(e.target.dataset.id);
    this.setData({ currentIndex:id });
  }
})