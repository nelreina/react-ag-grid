export const gridContainer = {
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  margin: 0,
  padding: 0
};
//#region AG Grid Number Format
const letterSpacing = '1.2px';
export const number = { 'text-align': 'right', 'padding-right': '3px' };
export const numberPositive = {
  ...number,
  color: 'blue',
  'letter-spacing': letterSpacing
};
export const numberNegative = {
  ...number,
  color: 'darkred',
  'letter-spacing': letterSpacing
};
//#endregion

export const toolbar = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '0.5em'
};
