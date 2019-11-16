import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LabelledTextInput from '../../components/LabelledTextInput/LabelledTextInput';
import DataTable from '../../components/DataTable/DataTable';
import {
  generateLoanDataWithFees,
  generateLoanDataWithoutFees
} from '../../utils/utils';

const Calculator = ({ amount, duration, title, upFrontFees }) => {
  const [interest, setInterest] = useState(0);

  const updateInterest = (inputEvent) =>
    setInterest(parseInt(inputEvent.target.value));

  if (!amount || !duration)
    return (
      <div>
        <p>Please enter amount and duration</p>
        <h3>{title}</h3>
      </div>
    );

  const generateLoanData = upFrontFees
    ? generateLoanDataWithFees
    : generateLoanDataWithoutFees;
  const data = generateLoanData(amount, duration, interest);

  return (
    <div>
      <LabelledTextInput
        label="Interest rate"
        postLabel="(in %)"
        onChange={updateInterest}
        value={interest}
      />
      <DataTable data={data} />
      <h3>{title}</h3>
    </div>
  );
};

Calculator.propTypes = {
  amount: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  title: PropTypes.string,
  upFrontFees: PropTypes.bool
};

Calculator.defaultProps = {
  title: null,
  upFrontFees: false
};

export default Calculator;
