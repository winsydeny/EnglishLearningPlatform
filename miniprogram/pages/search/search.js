Page({
  data: {
    word: '',
    translation: '',
    web: '',
    isShow: false,
    loadProgress: 0


  },
  inputOk(e) {
    this.setData({
      word: e.detail.value
    });
  },
  search() {
    // 判断中文还是英文
    const en = /^[a-zA-Z]+$/;
    const num = /^[0-9]]+$/;
    const that = this;

    if (that.data.word === '') {
      wx.showModal({
        title: 'error',
        content: '请输入您要查询的单词',
      })
    } else {
      let language = en.test(this.data.word) ? 'zh-CHS' : 'en';
      console.log(language, that.data.word);
      wx.cloud.callFunction({
        name: 'getwords',
        data: {
          word: that.data.word,
          to: language
        },
        complete: res => {
          let stop = that.loadProgress();
          console.log(JSON.parse(res.result));
          let data = JSON.parse(res.result);
          that.setData({
            translation: data.translation,
            web: data.web,
            isShow: true
          })
        }
      })
    }

  },
  loadProgress() {
    let stop;
    this.setData({
      loadProgress: this.data.loadProgress + 10
    })
    if (this.data.loadProgress < 100) {
      stop = setTimeout(() => {
        this.loadProgress();
      }, 100)
    } else {
      this.setData({
        loadProgress: 0
      })
    }
    return stop;
  }
})