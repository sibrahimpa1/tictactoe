import React, {Component} from 'react';
import './playground.css'
import {Field} from '../field/field'

class Playground extends Component{
  constructor(){
    super();
    this.state = {
      clickedField: 0,
      fields: [
        {
          id: 0,
          value: '',
          winner: false,
          btnDisabled: false
        },
        {
          id: 1,
          value: '',
          winner: false,
          btnDisabled: false
        },
        {
          id: 2,
          value: '',
          winner: false,
          btnDisabled: false
        },
        {
          id: 3,
          value: '',
          winner: false,
          btnDisabled: false
        },
        {
          id: 4,
          value: '',
          winner: false,
          btnDisabled: false
        },
        {
          id: 5,
          value: '',
          winner: false,
          btnDisabled: false
        },
        {
          id: 6,
          value: '',
          winner: false,
          btnDisabled: false
        },
        {
          id: 7,
          value: '',
          winner: false,
          btnDisabled: false
        },
        {
          id: 8,
          value: '',
          winner: false,
          btnDisabled: false
        }
      ],
      currentPlayer: true,
      currentSymbolX: true,
      winnerFound: false,
      lineDirection: ''
    }
  }

  _checkWinner = () => {
    const {fields} = this.state;
    var winnerCards = [];
    if(fields[0]['value'] === fields[1]['value'] && fields[0]['value'] === fields[2]['value'] && fields[0]['value'] !== '') winnerCards = [0,1,2, 'horizontal'];
    else if(fields[3]['value'] === fields[4]['value'] && fields[3]['value'] === fields[5]['value'] && fields[3]['value'] !== '') winnerCards = [3,4,5, 'horizontal'];
    else if(fields[6]['value'] === fields[7]['value'] && fields[6]['value'] === fields[8]['value'] && fields[6]['value'] !== '') winnerCards = [6,7,8, 'horizontal'];

    else if(fields[0]['value'] === fields[3]['value'] && fields[0]['value'] === fields[6]['value'] && fields[0]['value'] !== '') winnerCards = [0,3,6, 'vertical'];
    else if(fields[1]['value'] === fields[4]['value'] && fields[1]['value'] === fields[7]['value'] && fields[1]['value'] !== '') winnerCards = [1,4,7, 'vertical'];
    else if(fields[2]['value'] === fields[5]['value'] && fields[2]['value'] === fields[8]['value'] && fields[2]['value'] !== '') winnerCards = [2,5,8, 'vertical'];

    else if(fields[0]['value'] === fields[4]['value'] && fields[0]['value'] === fields[8]['value'] && fields[0]['value'] !== '') winnerCards = [0,4,8, 'diagonalLeft'];
    else if(fields[2]['value'] === fields[4]['value'] && fields[2]['value'] === fields[6]['value'] && fields[2]['value'] !== '') winnerCards = [2,4,6, 'diagonalRight'];

    if(winnerCards.length > 0){
      const {fields} = this.state;
      var newFields = fields;
      var direction = '';
      winnerCards.map(winnerID => {
        if(winnerID === 'horizontal' || winnerID === 'vertical' || winnerID === 'diagonalLeft' || winnerID === 'diagonalRight') {
          direction = winnerID;
        }
        else newFields[winnerID]['winner'] = true;
      })
      this.setState({
        winnerFound: true,
        fields: newFields,
        lineDirection: direction
      });
    }
  }
  _handleFieldClick = (fieldID) => {
    const {fields, currentSymbolX} = this.state;
    var newFields = fields;
    newFields[fieldID]['value'] = currentSymbolX;
    newFields[fieldID]['btnDisabled'] = true;
    this.setState({
      currentPlayer: !this.state.currentPlayer,
      currentSymbolX: !this.state.currentSymbolX, 
      fields: newFields
    });
    this._checkWinner();
  }

  _restartApp = () => {
    this.setState({
      clickedField: 0,
      fields: [
        {
          id: 0,
          value: '',
          winner: false,
          btnDisabled: false
        },
        {
          id: 1,
          value: '',
          winner: false,
          btnDisabled: false
        },
        {
          id: 2,
          value: '',
          winner: false,
          btnDisabled: false
        },
        {
          id: 3,
          value: '',
          winner: false,
          btnDisabled: false
        },
        {
          id: 4,
          value: '',
          winner: false,
          btnDisabled: false
        },
        {
          id: 5,
          value: '',
          winner: false,
          btnDisabled: false
        },
        {
          id: 6,
          value: '',
          winner: false,
          btnDisabled: false
        },
        {
          id: 7,
          value: '',
          winner: false,
          btnDisabled: false
        },
        {
          id: 8,
          value: '',
          winner: false,
          btnDisabled: false
        }
      ],
      currentPlayer: true,
      currentSymbolX: true,
      winnerFound: false,
      lineDirection: ''
    })
  }

  render(){
    const {currentPlayer, winnerFound, lineDirection} = this.state;
    var currPlayer = '';
    if(currentPlayer) currPlayer = 'Player 2';
    else currPlayer = 'Player 1';

    return(
      <div className="container">
        {winnerFound &&
          <div className="winner">{currPlayer} won!</div>
        }

        <div className={`winner-`+winnerFound +` playground`}>
        {
          this.state.fields.map(field => 
            <Field key={field.id} isWinner={field.winner} lineDirection={lineDirection} symbolValue={field.value} fieldClicked={(e) => this._handleFieldClick(field.id)} btnDisabled={field.btnDisabled}/>  
          )
        }
        </div>

        {currentPlayer ? (
          <h2 className="player player1">Current move: <span>Player 1</span></h2>
        ) : (
          <h2 className="player player2">Current move: <span>Player 2</span></h2>
        )}
        <button className="restart" onClick={(e) => this._restartApp()}>Restart</button>
      </div>
    )
  }

}
export default Playground