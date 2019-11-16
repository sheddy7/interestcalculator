import {
  getFirstDayOfNMonths,
  isValidRestrictions,
  generateLoanDataWithFees,
  generateLoanDataWithoutFees
} from './utils';

describe('Utility functions testing suite', () => {
  describe(getFirstDayOfNMonths, () => {
    const testData = [
      {
        startDate: '2019-08-04',
        monthsToAdvance: 1,
        expectedDate: '01/09/2019'
      },
      {
        startDate: '2019-09-01',
        monthsToAdvance: 3,
        expectedDate: '01/12/2019'
      },
      {
        startDate: '2020-02-29',
        monthsToAdvance: 1,
        expectedDate: '01/03/2020'
      }
    ];

    it('advances a date to the first day of the following month', () => {
      testData.map((data) => {
        let d = new Date(data.startDate);
        return expect(getFirstDayOfNMonths(d, data.monthsToAdvance)).toBe(
          data.expectedDate
        );
      });
    });
  });

  describe(isValidRestrictions, () => {
    describe('if restriction rules are not provided', () => {
      it('should return true (there are no restrictions)', () => {
        expect(isValidRestrictions(1000, 10)).toBe(true);
      });
    });

    describe('with restriction rules', () => {
      it('should return expected outcome for all test cases', () => {
        const rules = {
          amount_min: 100,
          amount_max: 10000,
          duration_min: 1,
          duration_max: 12
        };

        const testCases = [
          {
            amount: 1000,
            duration: 6,
            expectedResult: true
          },
          {
            amount: 100,
            duration: 12,
            expectedResult: true
          },
          {
            amount: 10,
            duration: 6,
            expectedResult: false
          },
          {
            amount: 1000,
            duration: 14,
            expectedResult: false
          },
          {
            amount: 1000000,
            duration: 20,
            expectedResult: false
          }
        ];

        testCases.map(({ amount, duration, expectedResult }) =>
          expect(isValidRestrictions(amount, duration, rules)).toBe(
            expectedResult
          )
        );
      });
    });
  });

  describe('generating loan data', () => {
    const testCases = (withFees) => [
      {
        amount: 1000,
        duration: 4,
        interest: 5,
        startDate: new Date('2019-08-04'),
        expectedResult: [
          {
            id: '01/09/2019',
            date: '01/09/2019',
            principal: '£250.00',
            interest: withFees ? '£150.00' : '£50.00',
            total: withFees ? '£400.00' : '£300.00'
          },
          {
            id: '01/10/2019',
            date: '01/10/2019',
            principal: '£250.00',
            interest: '£37.50',
            total: '£287.50'
          },
          {
            id: '01/11/2019',
            date: '01/11/2019',
            principal: '£250.00',
            interest: '£25.00',
            total: '£275.00'
          },
          {
            id: '01/12/2019',
            date: '01/12/2019',
            principal: '£250.00',
            interest: '£12.50',
            total: '£262.50'
          },
          {
            id: 'Total',
            date: 'Total',
            principal: '£1,000.00',
            interest: withFees ? '£225.00' : '£125.00',
            total: withFees ? '£1,225.00' : '£1,125.00'
          }
        ]
      },
      {
        amount: 200,
        duration: 2,
        interest: 10,
        startDate: new Date('2019-08-04'),
        expectedResult: [
          {
            id: '01/09/2019',
            date: '01/09/2019',
            principal: '£100.00',
            interest: withFees ? '£40.00' : '£20.00',
            total: withFees ? '£140.00' : '£120.00'
          },
          {
            id: '01/10/2019',
            date: '01/10/2019',
            principal: '£100.00',
            interest: '£10.00',
            total: '£110.00'
          },
          {
            id: 'Total',
            date: 'Total',
            principal: '£200.00',
            interest: withFees ? '£50.00' : '£30.00',
            total: withFees ? '£250.00' : '£230.00'
          }
        ]
      }
    ];

    describe(generateLoanDataWithoutFees, () => {
      describe('with no up front fees', () => {
        it('returns the expected result for all test cases', () => {
          testCases(
            false
          ).map(({ amount, duration, interest, startDate, expectedResult }) =>
            expect(
              generateLoanDataWithoutFees(amount, duration, interest, startDate)
            ).toEqual(expectedResult)
          );
        });
      });
    });

    describe(generateLoanDataWithFees, () => {
      describe('with up front fees', () => {
        it('returns the expected result for all test cases', () => {
          testCases(
            true
          ).map(({ amount, duration, interest, startDate, expectedResult }) =>
            expect(
              generateLoanDataWithFees(amount, duration, interest, startDate)
            ).toEqual(expectedResult)
          );
        });
      });
    });
  });
});
