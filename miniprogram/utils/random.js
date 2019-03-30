const currentAnswerIndex = (num) => {
  return Math.floor(Math.random() * num);
}

const index_id = () => {
  return Math.floor(Math.random() *1000000);
}

const word = (max,min) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {currentAnswerIndex,index_id,word};