import { calculate } from '../utils/calculate';
import { cashInOutRules } from '../constants/configs';
import dayjs from 'dayjs';

//dayjs week configuration to start the day from Monday
dayjs.Ls.en.weekStart = 1;

const main = (file) => {
  const commissions = [];
  let userTransactionState = {};

  try {
    JSON.parse(file).forEach((element) => {
      let fee = 0;
      const { freeLimit } = cashInOutRules[element.type][element.user_type];
      const userProp = element.user_id + element.type;

      //keeping track of weekly transactions
      if (userTransactionState[userProp]) {
        const { startDate } = userTransactionState[userProp];
        const isSameWeek = dayjs(startDate).isSame(element.date, 'week');

        userTransactionState = {
          ...userTransactionState,
          [userProp]: {
            amount: isSameWeek
              ? element.operation.amount
              : element.operation.amount - freeLimit,
            startDate: isSameWeek ? startDate : element.date,
          },
        };
      } else {
        userTransactionState = {
          ...userTransactionState,
          [userProp]: {
            amount: element.operation.amount - freeLimit,
            startDate: element.date,
          },
        };
      }

      //calculate fees
      if (userTransactionState[userProp].amount > 0) {
        fee = calculate(
          userTransactionState[userProp].amount,
          cashInOutRules[element.type][element.user_type].feeRate,
          cashInOutRules[element.type][element.user_type].minFee || null,
          cashInOutRules[element.type][element.user_type].maxFee || null
        );
      } else if (cashInOutRules[element.type][element.user_type].minFee > 0) {
        fee = cashInOutRules[element.type][element.user_type].minFee;
      }

      commissions.push(fee);
    });
  } catch (error) {
    process.stdout.write('File error!');
  }

  commissions.forEach((item) => process.stdout.write(item + '\n'));
  return commissions;
};

export default main;
