"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _calculate = require("../utils/calculate");

var _configs = require("../constants/configs");

var _dayjs = _interopRequireDefault(require("dayjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//dayjs week configuration to start the day from Monday
_dayjs.default.Ls.en.weekStart = 1;

const main = file => {
  let userTransactionState = {};
  JSON.parse(file).forEach(element => {
    let fee = 0;
    const {
      freeLimit
    } = _configs.cashInOutRules[element.type][element.user_type];
    const userProp = element.user_id + element.type; //keeping track of weekly transactions

    if (userTransactionState[userProp]) {
      const {
        amount,
        startDate
      } = userTransactionState[userProp];
      const isSameWeek = (0, _dayjs.default)(startDate).isSame(element.date, 'week');
      userTransactionState = _objectSpread(_objectSpread({}, userTransactionState), {}, {
        [userProp]: {
          amount: isSameWeek ? element.operation.amount : element.operation.amount - freeLimit,
          startDate: isSameWeek ? startDate : element.date
        }
      });
    } else {
      userTransactionState = _objectSpread(_objectSpread({}, userTransactionState), {}, {
        [userProp]: {
          amount: element.operation.amount - freeLimit,
          startDate: element.date
        }
      });
    } //calculate fees


    if (userTransactionState[userProp].amount > 0) {
      fee = (0, _calculate.calculate)(userTransactionState[userProp].amount, _configs.cashInOutRules[element.type][element.user_type].feeRate, _configs.cashInOutRules[element.type][element.user_type].minFee || null, _configs.cashInOutRules[element.type][element.user_type].maxFee || null);
    } else if (_configs.cashInOutRules[element.type][element.user_type].minFee > 0) {
      fee = _configs.cashInOutRules[element.type][element.user_type].minFee;
    }

    process.stdout.write(element.type + ' : ' + fee + '\n');
  });
};

var _default = main;
exports.default = _default;