import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = () => ({
  root: {
    width: '100%',
    marginTop: '10px',
    overflowX: 'auto'
  }
});

const DataTable = ({ classes, data }) => {
  if (!data || data.length === 0) return <p>Please enter the interest rate</p>;

  return (
    <Paper className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Repayment date</TableCell>
            <TableCell>Principal</TableCell>
            <TableCell>Interest</TableCell>
            <TableCell>Total repayment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((n) => {
            return (
              <TableRow key={n.id}>
                <TableCell component="th" scope="row">
                  {n.date}
                </TableCell>
                <TableCell>{n.principal}</TableCell>
                <TableCell>{n.interest}</TableCell>
                <TableCell>{n.total}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array
};

DataTable.defaultProps = {
  data: null
};

export default withStyles(styles)(DataTable);
