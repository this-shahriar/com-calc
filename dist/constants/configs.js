"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cashInOutRules = void 0;
//These rules will probably come from an API in real world scenario
//In this case we have to change it here for future changes/scales
const cashInOutRules = {
  cash_out: {
    natural: {
      minFee: 0,
      feeRate: 0.3,
      freeLimit: 1000
    },
    juridical: {
      minFee: 0.5,
      feeRate: 0.3,
      freeLimit: 0
    }
  },
  cash_in: {
    natural: {
      minFee: 0,
      maxFee: 5,
      feeRate: 0.03,
      freeLimit: 0
    },
    juridical: {
      minFee: 0,
      maxFee: 5,
      feeRate: 0.03,
      freeLimit: 0
    }
  }
};
exports.cashInOutRules = cashInOutRules;