import React from 'react';
import GraphComponent from 'react-graph-vis';
import './GraphWrapper.css';
import {Graph, initOptions, availableColors} from './GraphHelpers';
import {getQueries} from './EtherAPI';

const axios = require('axios');

class GraphWrapper extends React.Component {
	constructor(props) {
		super(props);
		var graph = {
			nodes: [], 
			edges: []
		};
		this.state = {
			input: "",
			options: initOptions,
			graph: graph,
			addresses: [],
			tokens: {"ETH": "blue"},
			unusedColors: availableColors,
		};
	}

	events = {
		selectNode: (event) => {
			var selectedNodeId = event.nodes[0];
			var selectedNode = this.getElementByKeyValue(this.state.graph.nodes, "id", selectedNodeId);
			this.props.onSelectedChange(selectedNode);
		},
		selectEdge: (event) => {
			var selectedEdgeId = event.edges[0];
			var selectedEdge = this.getElementByKeyValue(this.state.graph.edges, "id", selectedEdgeId);
			this.props.onSelectedChange(selectedEdge);
		},
		doubleClick: (event) => {
			var doubleClickedNodes = event.nodes;
			if(doubleClickedNodes.length > 0) {
				var doubleClickedNodeId = doubleClickedNodes[0];
				var doubleClickedNode = this.getElementByKeyValue(this.state.graph.nodes, "id", doubleClickedNodeId);
				this.getTransactions(doubleClickedNode["address"], false);
			}
		}
	}
	
	getElementByKeyValue(list, key, value) {
		for(var i=0; i < list.length; i++) {
			if(list[i][key] == value) {
				return list[i];
			}
		}
		return false;
	}
	
	getTransactions(input, resetGraph) {
		var queries = getQueries(input);
		axios.all([
			axios.get(queries[0]),
			axios.get(queries[1])
		]).then((result) => {
			var data1 = result[0].data;
			var data2 = result[1].data;
			// Test errors
			var allTransactions = data1.concat(data2["operations"]);
			var g = Object();
			if(resetGraph) {
				g = new Graph([], [], {}, {"ETH": "blue"}, availableColors);
			}
			else {
				g = new Graph(this.state.graph.nodes.slice(0), this.state.graph.edges.slice(0), this.state.addresses, this.state.tokens, this.state.unusedColors);
			}
			g.update(allTransactions, input.toLowerCase());
			var graph = {
				nodes: g.nodes,
				edges: g.edges,
			}
			this.setState({
				graph: graph,
				addresses: g.addresses,
				tokens: g.tokens,
				unusedColors: g.unusedColors
			});
		});
	}
	
	componentWillReceiveProps(nextProps) {
		if(nextProps.input !== this.state.input) {
			var input = nextProps.input;
			this.setState({input: input});
			this.getTransactions(input, true);
		}
	}
	
    render() {
        return (
			<div id="graph">
				<GraphComponent graph={this.state.graph} options={this.state.options} events={this.events} style={{ position: "absolute", height: "100%", width: "100%" }}/>
            </div>
        );
    }
}
export default GraphWrapper;