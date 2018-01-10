import React from 'react';

const style = {
  background: '#F8DE7E',
  textAlign: 'Center',
  padding: '5px'
};

// const FullWidth = props => {
//   return <h3 style={style}>{props.node.data.Section}</h3>;
// };
const FullWidth = props => {
  return <h4 style={style}>{props.node.data.Section}</h4>;
};
export default FullWidth;
