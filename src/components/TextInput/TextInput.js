import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const styles = () => ({
  input: {
    margin: '0 0 10px'
  }
});

const TextInput = ({ classes, onChange, value }) => {
  return (
    <OutlinedInput
      className={classes.input}
      type="number"
      onChange={onChange}
      value={value ? value : ''}
    />
  );
};

TextInput.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(TextInput);
