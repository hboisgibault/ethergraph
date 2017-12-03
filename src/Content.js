import React from 'react';
import {Router, Route, Link} from 'react-router'
import './Content.css';
import GraphWrapper from './GraphWrapper';
import Sidebar from './Sidebar';

class Content extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedElement: {}
		};
		this.handleSelectedChange = this.handleSelectedChange.bind(this);
	}
	
	handleSelectedChange(selectedElement) {
		var newElement = JSON.parse(JSON.stringify(selectedElement));
		this.setState({
			selectedElement: newElement,
		});
	}
	
    render() {
        return (
            <div id="content">
					<GraphWrapper input={this.props.input} onSelectedChange={this.handleSelectedChange} />
					<Sidebar selectedElement={this.state.selectedElement} />
			</div>
        );
    }
}
export default Content;