const dotenv = require('dotenv');
dotenv.config();
const env = process.env;

function isCritical(err) {
  return ( err.name === env.ERR_1 || err.name === env.ERR_2 || err.name === env.ERR_3 );
}

module.exports = {
  isCritical
}
