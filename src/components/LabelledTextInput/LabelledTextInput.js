import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../components/TextInput/TextInput';
import './LabelledTextInput.css';

const LabelledTextInput = ({ label, postLabel, onChange, value }) => {
  return (
    <div className="labelled-row">
      <p className="label-text">{label}</p>
      <TextInput onChange={onChange} value={value} />
      <p className="label-text">{postLabel}</p>
    </div>
  );
};

LabelledTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  postLabel: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number
};

LabelledTextInput.defaultProps = {
  postLabel: null,
  value: 0
};

export default LabelledTextInput;
