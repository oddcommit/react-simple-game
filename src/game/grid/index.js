import React, { Component } from "react";
import Node from './node';
import './index.css';

//possible keyboard input values
const INPUTS = {
  LEFT: 37, 
  UP: 38, 
  RIGHT: 39,
  DOWN: 40,
  W: 87,
  S: 83,
  A: 65,
  D: 68
};

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 0,
      columns: 0, 
      mashrooms: [], 
      player: 0,
      score: 0
    };
  }

  componentDidMount() {
    const rows = prompt("Enter number of rows:");
    const columns = prompt("Enter number of columns:");
    this.setState({
      rows: rows,
      columns: columns
    }, () => {
      this.spawnPlayer();
    });
  }

  //generate player in the center of grid
  spawnPlayer() {
    this.setState({
      player: parseInt((this.state.rows - 1)/ 2)*this.state.columns + parseInt((this.state.columns - 1) / 2)
    }, () => {
      this.spawnMashrooms();
    });
  }
  
  //randomly generate mashrooms
  spawnMashrooms() {
    let i = 0, mashrooms = [];

    while (i < this.state.rows) {
      let mashroom = parseInt(Math.random()*this.state.rows*this.state.columns);
      if (mashroom !== this.state.player && !mashrooms.includes(mashroom)) {
        mashrooms.push(mashroom);
        ++i;
      }
    }
    this.setState({
      mashrooms: mashrooms
    }, () => {
      this.listenInputs();
    });
  }

  //listen for keyboard inputs
  listenInputs() {
    let self = this;
    document.onkeyup = function(event) {
      let newPosX, newPosY, isPlayerMoved = true;
      switch(event.keyCode) {
        case INPUTS.LEFT:
        case INPUTS.A:
          newPosX = (self.state.player % self.state.columns) - 1;
          newPosY = parseInt(self.state.player / self.state.columns);
          if (newPosX < 0) {
            isPlayerMoved = false;
            newPosX = 0;
          }
          self.setState({
            player: (newPosY*self.state.columns) + newPosX
          });
          break;
        
        case INPUTS.UP:
        case INPUTS.W:
          newPosX = (self.state.player % self.state.columns);
          newPosY = parseInt(self.state.player / self.state.columns) - 1;
          if (newPosY < 0) {
            isPlayerMoved = false;
            newPosY = 0;
          }
          self.setState({
            player: (newPosY*self.state.columns) + newPosX
          });
          break;

        case INPUTS.RIGHT:
        case INPUTS.D:
          newPosX = (self.state.player % self.state.columns) + 1;
          newPosY = parseInt(self.state.player / self.state.columns);
          if (newPosX >= self.state.columns) {
            isPlayerMoved = false;
            newPosX = self.state.columns - 1;
          }
          self.setState({
            player: (newPosY*self.state.columns) + newPosX
          });
          break;
        
        case INPUTS.DOWN:
        case INPUTS.S:
          newPosX = (self.state.player % self.state.columns);
          newPosY = parseInt(self.state.player / self.state.columns) + 1;
          if (newPosY >= self.state.rows) {
            isPlayerMoved = false;
            newPosY = self.state.rows - 1;
          }
          self.setState({
            player: (newPosY*self.state.columns) + newPosX
          });
          break;

        default:
          break;
      }
      
      //pick up mashroom
      if (self.state.mashrooms.includes(self.state.player)) {
        self.setState({
          mashrooms: self.state.mashrooms.filter(function(value) {
            if (value === self.state.player) {
              return false;
            }
            return true;
          })
        });
      }

      //if player is not moved then dont increase steps
      if (isPlayerMoved) {
        self.setState({
          score: self.state.score + 1
        });
      }

      //finish game
      if (self.state.mashrooms.length <= 0) {
        alert('Total number of steps: ' + self.state.score);
        self.spawnMashrooms();
        self.spawnPlayer();
        self.setState({
          score: 0,
        })
      }
    } 
  }

  render() {
    const rowsHTML = [];
    for (let i = 0; i < this.state.rows; ++i) {
      let columnsHTML = [];
      for (let j = 0; j < this.state.columns; ++j) {
        let character = 'none';
        
        if (this.state.player === (i*this.state.columns) + j) {
          character = 'player';
        } else if(this.state.mashrooms.includes(i*this.state.columns + j)) {
          character = 'mashroom';
        }

        columnsHTML.push(
          <Node character={character}>
          </Node>
        )
      }

      //push columns in each rows
      rowsHTML.push(
        <div className="row">
          { columnsHTML }
        </div>
      )
    }
    return (
      <div className="grid">
        { rowsHTML }
      </div>
    );
  }
}