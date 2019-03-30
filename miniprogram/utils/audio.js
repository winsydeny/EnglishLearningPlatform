
const innerAudioContext = wx.createInnerAudioContext()

const audio = (mSrc) => {
  innerAudioContext.autoplay = false
  innerAudioContext.src = mSrc;
  innerAudioContext.onPlay(() => {
    console.log('开始播放')
  })
  innerAudioContext.onError((res) => {
    console.log(res.errMsg)
    console.log(res.errCode)
  })
 
  
  return innerAudioContext;
};

module.exports = audio;
