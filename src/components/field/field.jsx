import React from 'react';
import './field.css';

export const Field = (props) => {
  const {symbolValue, isWinner, lineDirection, btnDisabled} = props;
  var symbol;
  if(symbolValue === "") symbol = '';
  else if(symbolValue) symbol = <div className="symbol iks"> <i className="fa fa-times"></i> </div>;
  else if (!symbolValue) symbol = <div className="symbol circle"> <i className="fa fa-circle-o"></i> </div>;

  return(
    <button className={ `btnDisabled-`+btnDisabled+` field`} onClick={(e) => props.fieldClicked(props.id)}>
      {isWinner && 
        <div className={lineDirection + ` cross-line`}></div>
      }
      {symbol}
    </button>
  )
}