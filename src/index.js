import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { LicenseManager } from 'ag-grid-enterprise/main';

import 'babel-polyfill';
import '../node_modules/ag-grid/dist/styles/ag-grid.css'; // eslint-disable-line import/no-unresolved
import '../node_modules/ag-grid/dist/styles/ag-theme-fresh.css'; // eslint-disable-line import/no-unresolved
import '../node_modules/ag-grid/dist/styles/ag-theme-material.css'; // eslint-disable-line import/no-unresolved

LicenseManager.setLicenseKey(
  'ag-Grid_Evaluation_License_Key_Not_for_Production_100Devs22_February_2018__MTUxOTI1NzYwMDAwMA==7afb673842c95e7dade2a77ee4a064b6'
);

render(<App />, document.querySelector('#root'));
