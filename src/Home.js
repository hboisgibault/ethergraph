import React, { Component } from 'react';
import './Home.css';
import {Button} from 'react-bootstrap';

class Home extends Component {
	constructor(props) {
		super(props);
	}

	render() {
    return (
	  <div className="description">
		<div className="title"><b>Unfold the Blockchain</b></div>
		<div className="subtitle">Explore the Ethereum Blockchain as a graph</div>
		<div className="tryButton"><Button bsStyle="primary">Try an example</Button></div>
      </div>
    );
  }
}

export default Home;
