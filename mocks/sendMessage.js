const sendMessage = () => {
  return Promise.resolve( { res: true })
};

function genRes() {
  let rand = Math.random()

  let res
  if( rand > 0.5) {
    res = true
  } else {
    res = false
  }
  return res;
}

sendMessage().then(res => {
  console.log(res)
})

module.exports = {
  sendMessage
}