import React, { Component } from 'react';
import './App.css';
import Main from './Main';
import NotFound from './NotFound';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

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
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Main}/>
			<Route path="/address/:address" component={Main}/>
			<Route path="/tx/:txHash" component={Main}/>
			<Route path="*" component={NotFound}/>
		</Switch>
	</BrowserRouter>
    );
  }
}

export default App;
