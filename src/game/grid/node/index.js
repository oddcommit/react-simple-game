import React, { Component } from "react";
import './index.css';

export default class Node extends Component {
	render() {
		return (
			<div className={ 'cell ' + this.props.character }>
			</div>
		);
	}
}