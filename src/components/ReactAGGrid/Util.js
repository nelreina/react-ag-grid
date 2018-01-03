import accounting from 'accounting';
import moment from 'moment';

import { number, numberNegative, numberPositive } from './style';

const dateFormat = 'DD-MM-YYYY hh:mm A';
const dateFormatShort = 'DD-MM hh:mm A';

const amountSettings = {
  symbol: '',
  precision: 2,
  thousand: ',',
  format: {
    pos: '%s %v',
    neg: '%s (%v)',
    zero: '%s  -'
  }
};
const coaAmountSettings = { ...amountSettings, precision: 0 };
const coaAmount = params =>
  accounting.formatMoney(params.value / 1000, coaAmountSettings);

const amountStyle = params =>
  params.value < 0 ? numberNegative : numberPositive;

const coaStyle = params => {
  const amount = { ...amountStyle(params), cursor: 'pointer' };
  return amount;
};

const getStyledColumnDef = (columnDef, cellClicked) =>
  columnDef.map(col => {
    const ret = col;
    switch (col.fieldType) {
      case 'integer':
      case 'percentage':
        ret.cellStyle = number;
        break;
      case 'amount':
        ret.cellStyle = params =>
          !isNaN(params.value) ? amountStyle(params) : null;
        ret.cellRenderer = params =>
          !isNaN(params.value)
            ? accounting.formatMoney(params.value, amountSettings)
            : params.value;
        break;
      case 'date':
        ret.cellRenderer = params =>
          moment(params.value).isValid()
            ? moment(params.value).format(dateFormat)
            : params.value;
        break;
      case 'date-short':
        ret.cellRenderer = params =>
          moment(params.value).isValid()
            ? moment(params.value).format(dateFormatShort)
            : params.value;

        break;
      case 'email-short':
        ret.cellRenderer = params =>
          params.value
            .left(params.value.indexOf('@'))
            .replaceAll('.', ' ')
            .humanize()
            .titleCase();
        break;
      case 'coa-amount':
        ret.cellStyle = amountStyle;
        ret.cellRenderer = coaAmount;
        // ret.aggFunc = 'sum';
        break;
      case 'coa-amount-link':
        ret.cellStyle = coaStyle;
        ret.cellClass = 'link';
        ret.cellRenderer = coaAmount;
        ret.onCellClicked = cellClicked;
        // ret.aggFunc = 'sum';
        break;
      default:
        break;
    }
    ret.hide = col.initShow === 'N';
    return ret;
  });

const defaultColDef = {
  // set every column width
  width: 100,
  // make every column editable
  editable: false
  // make every column use 'text' filter by default
  // filter: 'text',
};
export { defaultColDef, getStyledColumnDef };
