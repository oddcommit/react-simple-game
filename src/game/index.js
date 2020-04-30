import React, { Component } from "react";
import Grid from './grid';
import './index.css';

export default class Game extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container">
        <Grid></Grid>
      </div>
    );
  }
}