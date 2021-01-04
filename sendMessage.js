const fetch = require("node-fetch");

async function sendMessage(err ) {
  let response;
  try {
    response = await fetch('http://sample.text ', {
      method: 'POST',
    });
    return true
  } catch (e) {
    console.error(e)
    return false
  }
  // console.log(response.status);
  // return genRes();
}

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

module.exports = {
  sendMessage
}