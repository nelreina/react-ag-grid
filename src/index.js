import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { LicenseManager } from 'ag-grid-enterprise/main';

import 'babel-polyfill';
import '../node_modules/ag-grid/dist/styles/ag-grid.css'; // eslint-disable-line import/no-unresolved
import '../node_modules/ag-grid/dist/styles/ag-theme-fresh.css'; // eslint-disable-line import/no-unresolved
import '../node_modules/ag-grid/dist/styles/ag-theme-material.css'; // eslint-disable-line import/no-unresolved

LicenseManager.setLicenseKey();

render(<App />, document.querySelector('#root'));
