export const calculate = (amount, percentage, min, max) => {
  const fee = (percentage / 100) * amount;

  if (min && fee < min) return min;
  if (max && fee > max) return max;
  else return fee;
};
