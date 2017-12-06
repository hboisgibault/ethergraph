import React from 'react';
import GraphComponent from 'react-graph-vis';
import './GraphWrapper.css';
import {Graph, initOptions, availableColors, randomGraph} from './GraphHelpers';
import {getQueries} from './EtherAPI';
import {Alert} from 'react-bootstrap';

const axios = require('axios');
const ethColor = "#2243B6";

class GraphWrapper extends React.Component {
	constructor(props) {
		super(props);
		var graph = randomGraph();
		this.state = {
			input: "",
			options: initOptions,
			graph: graph,
			addresses: [],
			tokens: {"ETH": ethColor},
			unusedColors: availableColors,
			showError: false,
			error: "",
		};
		this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
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
		if("error" in queries || queries.length == 0) {
			this.setState({
				error: (queries.length == 0) ? "Please verify your input." : queries["error"],
				showError: true,
			})
			return false;
		}
		axios.all(
			queries.map(axios.get)
		).then((result) => {
			if("error" in result || result.length == 0) {
				this.setState({
					error: (result.length == 0) ? "Invalid input." : result["error"],
					showError: true,
				})
				return false;
			}
			console.log(result);
			// Get list of transactions
			var allTransactions = [];
			for(var i=0; i < result.length; i++) {
				var data = result[i].data;
				if("operations" in data) {
					allTransactions = allTransactions.concat(data["operations"]);
				}
				else {
					allTransactions = allTransactions.concat(data);
				}
			}
			console.log(allTransactions);
			// Build graph
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
		return true;
	}
	
	componentWillReceiveProps(nextProps) {
		if(nextProps.input !== this.state.input) {
			var input = nextProps.input;
			this.setState({input: input});
			this.getTransactions(input, true);
		}
	}
	
	componentDidMount() {
		if(this.props.input != "" && this.state.addresses.length == 0) {
			this.getTransactions(this.props.input, true);
			this.setState({
				input: this.props.input
			});
		}
	}
	
	handleAlertDismiss() {
		this.setState({ showError: false });
	}
  
    render() {
        return (
			<div id="graph">
				{ this.state.showError ? <Alert className="error-alert" bsStyle="danger" onDismiss={this.handleAlertDismiss.bind(this)}>{this.state.error}</Alert> : null }
				<GraphComponent graph={this.state.graph} options={this.state.options} events={this.events} style={{ position: "absolute", height: "100%", width: "100%" }}/>
            </div>
        );
    }
}
export default GraphWrapper;