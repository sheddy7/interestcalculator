This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Example loan Calculator

Potential areas to improve:

### Testing

Full coverage with unit tests.
BDD style testing around key integration points:
* Showing/hiding calculators based on inputs
* Showing/hiding calculators based on restrictions (using nock)
* Showing calculator results based on interest input
E2E testing for happy day scenarios (using Cypress).

### Error handling

Catch errors from API call, show message, allow retry.
Handle invalid input entry.

### Code improvements

Split generateLoanData up further.
Make TextInput and DataTable more generic for potentail reuse (Data table columns and data keys, TextInput hardcoded to numeric).

### Usability

Help icons with tooltips to clarify what is expected in each input.
Ability to handle translations and different currencies.