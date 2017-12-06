import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import {BrowserRouter,Route} from 'react-router-dom'

class Home extends Component {
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
	}
	
	render() {
    return (
	  <div>
		<Header input={this.state.input} onInputChange={this.handleInputChange} />
		<Content input={this.state.input}/>
		<Footer/>
      </div>
    );
  }
}

export default Main;
