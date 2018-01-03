import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import S from 'string';

import Form from './Form';
import Timer from './Timer';
import { defaultColDef as utilDefaultDef, getStyledColumnDef } from './Util';
import { gridContainer, toolbar } from './style';

import './style.css';

S.extendPrototype();

export default class Grid extends Component {
  static propTypes = {
    rowData: PropTypes.array,
    error: PropTypes.string,
    columnDef: PropTypes.array.isRequired,
    defaultColDef: PropTypes.object,
    height: PropTypes.any.isRequired,
    loading: PropTypes.bool.isRequired,
    hideTimer: PropTypes.bool.isRequired,
    fileName: PropTypes.string.isRequired,
    lastLoadTime: PropTypes.number,
    onCellClicked: PropTypes.func
  };
  static defaultProps = {
    rowData: undefined,
    error: undefined,
    onCellClicked: undefined,
    defaultColDef: utilDefaultDef,
    loading: false,
    lastLoadTime: 0,
    hideTimer: false,
    fileName: 'export',
    theme: 'fresh'
  };
  state = {
    quickFilterText: '',
    searchText: ''
  };
  componentWillReceiveProps(nextProps) {
    this.handleOverLay(nextProps);
  }
  componentWillUpdate() {
    if (this.gridApi) {
      this.gridApi.showLoadingOverlay();
    }
  }
  componentDidUpdate() {
    this.handleOverLay(this.props);
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.sizeColumnsToFit();
  };
  sizeColumnsToFit = () => {
    if (this.gridApi) {
      const { defaultColDef } = this.props;
      if (defaultColDef.fitColumns === 'Y') {
        this.gridApi.sizeColumnsToFit();
      }
    }
  };
  handleOverLay = props => {
    const { rowData, loading } = props;
    if (this.gridApi) {
      if (loading) {
        this.gridApi.showLoadingOverlay();
      } else if (rowData && rowData.lenth === 0) {
        this.gridApi.showNoRowsOverlay();
      } else {
        this.gridApi.hideOverlay();
      }
    }
    this.sizeColumnsToFit();
  };
  clearFilter = evt => {
    evt.preventDefault();
    this.setState({ quickFilterText: '', searchText: '' });
    this.gridApi.setFilterModel(null);
    this.gridApi.onFilterChanged();
  };
  textChange = evt => {
    const { target: { value: searchText } } = evt;
    this.setState({ searchText });
  };
  search = evt => {
    evt.preventDefault();
    const { searchText: quickFilterText } = this.state;
    this.setState({ quickFilterText });
  };
  saveCSV = () => {
    let { fileName } = this.props;
    fileName = fileName.replaceAll('.', '').slugify();
    this.gridApi.exportDataAsCsv({
      fileName
    });
  };
  render() {
    const {
      rowData,
      height,
      columnDef,
      defaultColDef,
      loading,
      error,
      lastLoadTime,
      onCellClicked,
      hideTimer,
      theme
    } = this.props;
    const styledColumnDef = getStyledColumnDef(columnDef, onCellClicked);
    let style = gridContainer;
    if (height) {
      style = { ...gridContainer, height };
    }
    const formProps = {
      search: this.search,
      textChange: this.textChange,
      clearFilter: this.clearFilter,
      searchText: this.state.searchText,
      loading
    };
    const totalRows = rowData ? rowData.length : 0;
    return (
      <section style={{ width: '100%', height: '100%' }}>
        <div style={toolbar}>
          <Form {...formProps} />
          <button
            disabled={loading}
            onClick={this.saveCSV}
            icon="download"
            content="Save to CSV"
          >
            Save to CSV
          </button>
        </div>
        <div style={style} className={`ag-theme-${theme}`}>
          <AgGridReact
            columnDefs={styledColumnDef}
            defaultColDef={defaultColDef}
            rowData={rowData}
            onGridReady={this.onGridReady}
            enableSorting="true"
            enableFilter="true"
            enableColResize="true"
            quickFilterText={this.state.quickFilterText}
          />
        </div>
        <div className="footer">
          {!hideTimer && (
            <Timer
              loading={loading}
              count={totalRows}
              expectedLoadTime={lastLoadTime}
            />
          )}
          {error && <span className="error-message">ERROR: {error}</span>}
        </div>
      </section>
    );
  }
}
