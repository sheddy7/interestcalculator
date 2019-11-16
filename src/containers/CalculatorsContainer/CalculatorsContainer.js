import React, { useState, useEffect } from 'react';
import LabelledTextInput from '../../components/LabelledTextInput/LabelledTextInput';
import Calculator from '../Calculator/Calculator';
import withRestrictions from '../../hoc/withRestrictions';
import './CalculatorsContainer.css';

const CalculatorsContainer = () => {
  const [amount, setAmount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [restrictionData, setRestrictionData] = useState({});

  const fetchRestrictions = async () => {
    try {
      const response = await fetch(
        `http://www.mocky.io/v2/5d4aa9e93300006f000f5ea9`
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const data = await response.json();
      setRestrictionData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRestrictions();
  }, []);

  const updateAmount = (inputEvent) =>
    setAmount(parseInt(inputEvent.target.value));
  const updateDuration = (inputEvent) =>
    setDuration(parseInt(inputEvent.target.value));

  return (
    <div>
      <div className="inputs-container">
        <LabelledTextInput
          label="Amount requested"
          postLabel="(in £)"
          onChange={updateAmount}
          value={amount}
        />
        <LabelledTextInput
          label="Duration"
          postLabel="(in months)"
          onChange={updateDuration}
          value={duration}
        />
      </div>
      <div className="calc-tables-container">
        <div className="calc-table">
          {withRestrictions(
            <Calculator
              amount={amount}
              duration={duration}
              title="Revolving Credit Facility"
            />,
            restrictionData.revolving_credit_facility
          )}
        </div>
        <div className="calc-table">
          {withRestrictions(
            <Calculator
              amount={amount}
              duration={duration}
              title="Business Loan"
              upFrontFees
            />,
            restrictionData.business_loan
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculatorsContainer;
