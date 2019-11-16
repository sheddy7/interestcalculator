const UPFRONT_FEES_PERCENT = 10;

const getTwoDigitDate = (date) => ('0' + date.getDate()).slice(-2);
const getTwoDigitMonth = (date) => ('0' + (date.getMonth() + 1)).slice(-2);

export const getFirstDayOfNMonths = (date, monthsToAdvance) => {
  let newDate = new Date(date.getTime());
  newDate.setMonth(date.getMonth() + monthsToAdvance, 1);
  return `${getTwoDigitDate(newDate)}/${getTwoDigitMonth(
    newDate
  )}/${newDate.getFullYear()}`;
};

const formatCurrency = (n) =>
  '£' + n.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

const calculateInterestPayment = (amountLeft, interestRate) =>
  (amountLeft * interestRate) / 100;

const calculateUpFrontFees = (amount) => (amount * UPFRONT_FEES_PERCENT) / 100;

const generateRepaymentRow = (date, principal, interestPayment) => {
  return {
    id: date,
    date,
    principal: formatCurrency(principal),
    interest: formatCurrency(interestPayment),
    total: formatCurrency(principal + interestPayment)
  };
};

const generateLoanData = (upFrontFees) => (
  amount,
  duration,
  interest,
  startDate = new Date()
) => {
  let data = [];

  // If we are missing anything we need to calculate loan repayments then return empty data
  if (!amount || !duration || !interest) return data;

  const principal = amount / duration;
  let totalInterest = 0;

  for (let i = 0; i < duration; i++) {
    const date = getFirstDayOfNMonths(startDate, i + 1);
    const amountLeft = amount - principal * i;
    let interestPayment = calculateInterestPayment(amountLeft, interest);
    if (upFrontFees && i === 0)
      interestPayment += calculateUpFrontFees(amountLeft);
    totalInterest += interestPayment;

    data.push(generateRepaymentRow(date, principal, interestPayment));
  }

  data.push(generateRepaymentRow('Total', amount, totalInterest));

  return data;
};

export const generateLoanDataWithFees = generateLoanData(true);
export const generateLoanDataWithoutFees = generateLoanData(false);

const isValidforMinRule = (value, minRule) =>
  !minRule ? true : value >= minRule;
const isValidforMaxRule = (value, maxRule) =>
  !maxRule ? true : value <= maxRule;

export const isValidRestrictions = (amount, duration, rules = {}) =>
  isValidforMinRule(amount, rules.amount_min) &&
  isValidforMaxRule(amount, rules.amount_max) &&
  isValidforMinRule(duration, rules.duration_min) &&
  isValidforMaxRule(duration, rules.duration_max);
