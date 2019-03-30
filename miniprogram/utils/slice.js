const {currentAnswerIndex} = require('./random.js')
const sliceWord = (word) => {
  let pos = currentAnswerIndex(word.length-2);
  return pos;
}

module.exports = {sliceWord};