import React from 'react';
import { isValidRestrictions } from '../utils/utils';

const withRestrictions = (WrappedComponent, restrictionRules) => {
  if (!restrictionRules) return <p>Loading the rules...</p>;

  const { amount, duration } = WrappedComponent.props;

  if (isValidRestrictions(amount, duration, restrictionRules)) {
    return WrappedComponent;
  }

  return (
    <p>
      This loan type is not available for the selected loan amount and duration.
    </p>
  );
};

export default withRestrictions;
