import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			input: "",
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

export default App;
