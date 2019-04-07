import React from 'react';
import './Content.css';
import GraphWrapper from './GraphWrapper';
import Sidebar from './Sidebar';
import Home from './Home';

class Content extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedElement: {},
			tokens: {},
			visibleTokens: [],
		};
		this.handleSelectedChange = this.handleSelectedChange.bind(this);
		this.handleTokensChange = this.handleTokensChange.bind(this);
		this.handleVisibleChange = this.handleVisibleChange.bind(this);
	}
	
	handleSelectedChange(selectedElement) {
		var newElement = JSON.parse(JSON.stringify(selectedElement));
		this.setState({
			selectedElement: newElement,
		});
	}
	
	handleTokensChange(tokens) {
		this.setState({
			tokens: tokens,
		});
	}
	
	handleVisibleChange(visibleTokens) {
		this.setState({
			visibleTokens: visibleTokens,
		});
	}
	
    render() {
        return (
            <div id="content">
				{ this.props.input == "" ? <Home/> : null }
				<GraphWrapper input={this.props.input} onSelectedChange={this.handleSelectedChange} onTokensChange={this.handleTokensChange} visibleTokens={this.state.visibleTokens} />
				<Sidebar selectedElement={this.state.selectedElement} tokens={this.state.tokens} />
			</div>
        );
    }
}
export default Content;