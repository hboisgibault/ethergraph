import React, { Component } from 'react';
import logo from './logo.svg';
import './Main.css';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import {isAddress, isTxHash} from './EtherAPI';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const ADDRESS_INPUT = "ADDRESS_INPUT";
const TX_INPUT = "TX_INPUT";

class Main extends Component {
	constructor(props) {
		super(props);
		var match = props.match;
		var input = "";
		if(match.path == '/address/:address') {
			input = match.params.address;
		}
		else if(match.path == '/tx/:txHash') {
			input = match.params.txHash;
		}
		this.state = {
			input: input,
		}
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	
	handleInputChange(input) {
		this.setState({
			input: input,
		});
		if(isAddress(input)) {
			this.props.history.push("/address/" + input);
		}
		else if(isTxHash(input)) {
			this.props.history.push("/tx/" + input);
		}
	}
	
	render() {
    return (
	  <div id="main">
		<Header input={this.state.input} onInputChange={this.handleInputChange} />
		<Content input={this.state.input}/>
		<Footer/>
      </div>
    );
  }
}

export default Main;
