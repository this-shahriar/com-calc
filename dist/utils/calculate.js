"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculate = void 0;

const calculate = (amount, percentage, min, max) => {
  const fee = percentage / 100 * amount;
  if (min && fee < min) return min;
  if (max && fee > max) return max;else return fee;
};

exports.calculate = calculate;