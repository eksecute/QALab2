// 'use sctrict';
const { ValidationError, PermissionError, DatabaseError } = require('./modules/errors');
const {isCritical} = require('./checkCritical');
const {sendMessage} = require('./sendMessage');

const dotenv = require('dotenv');
dotenv.config();
const env = process.env;


class ExceptionManager {
  constructor() {
    this.ordinary = 0;
    this.crit = 0;
    this.errorSending = 0;
  }

  handlingError (err) {
    isCritical(err) ? this.crit++ : this.ordinary++;

    if (isCritical(err)) {
      this.crit++
      sendMessage(err).then( (res) => {
        res ? null : this.errorSending++
      });

    } else {
      this.ordinary++;
    }
  }


//   handlingError(err) {
//     isCritical(err) ? this.crit++ : this.ordinary++;
//   }
}


// let exceptionManager = new ExceptionManager();
// exceptionManager.handlingError(new ValidationError());
// exceptionManager.handlingError(new ValidationError());
// exceptionManager.handlingError(new ValidationError());
// exceptionManager.handlingError(new ValidationError());
// exceptionManager.handlingError(new Error());
// //
//
// setTimeout(() => exceptionManager.getStat(), 0)


module.exports = {
  ExceptionManager
};

