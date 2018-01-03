import React, { Component } from 'react';
import Grid from './ReactAGGrid/Grid';

const data = [
  { make: 'Toyota', model: 'Celica', price: 35000 },
  { make: 'Ford', model: 'Mondeo', price: 32000 },
  { make: 'Greatwall', model: 'Daven', price: -52000 },
  { make: 'Porsche', model: 'Boxter', price: 72000 }
];
const def = [
  { field: 'make', width: 150 },
  { field: 'model', width: 150 },
  { field: 'price', width: 150, fieldType: 'amount' }
];
class App extends Component {
  render() {
    return (
      <div>
        <Grid columnDef={def} height={'80vh'} rowData={data} />
      </div>
    );
  }
}

export default App;
