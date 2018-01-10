import React, { Component } from 'react';
import Grid from './ReactAGGrid/Grid';
import data from '../data/balancesheet.json';
import FullWidth from './FullWidth';

const isFullWidth = data => data && data.CoaCode === 'fw';
const isFullWidthCell = rowNode => isFullWidth(rowNode.data);
const getRowHeight = params => (isFullWidth(params.data) ? 50 : 25);
const def = [
  { field: 'CoaCode', width: 100, headerName: 'Code' },
  { field: 'Section', width: 150, hide: true, rowGroup: true },
  { field: 'RowDescription', width: 350 },
  {
    group: 'Resident',
    headerName: 'Resident',
    children: [
      {
        field: 'col1',
        width: 150,
        fieldType: 'coa-amount',
        aggFunc: 'sum',
        headerName: 'AFL'
      },
      {
        field: 'col2',
        width: 150,
        fieldType: 'coa-amount',
        aggFunc: 'sum',
        headerName: 'FOREX'
      }
    ]
  },
  {
    group: 'NON-Resident',
    headerName: 'Resident',
    children: [
      {
        field: 'col3',
        width: 150,
        fieldType: 'coa-amount',
        aggFunc: 'sum',
        headerName: 'AFL'
      },
      {
        field: 'col4',
        width: 150,
        fieldType: 'coa-amount',
        aggFunc: 'sum',
        headerName: 'FOREX'
      }
    ]
  }
];
const options = {
  enableSorting: true,
  enableFilter: true,
  enableColResize: true,
  enableRangeSelection: true,
  enableStatusBar: true,
  alwaysShowStatusBar: true,
  enableRowGroup: true,
  // groupHideOpenParents: true,
  frameworkComponents: {
    fullWidthCellRenderer: FullWidth
  },
  isFullWidthCell,
  getRowHeight,
  fullWidthCellRenderer: 'fullWidthCellRenderer'
  // domLayout: 'forPrint'
};
class App extends Component {
  render() {
    return (
      <div>
        <Grid
          columnDef={def}
          height={'80vh'}
          rowData={data}
          options={options}
        />
      </div>
    );
  }
}

export default App;
