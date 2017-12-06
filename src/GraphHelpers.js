export const availableColors = ["#E12C2C", "#FB4D46", "#FFAA1D", "#FFF700", "#299617", "#A7F432", "#5DADEC","#5946B2", "#9C51B6", "#A83731", "#AF6E4D", "#FF5470", "#FF7A00", "#FF007C", "#2E5894", "#a88905", "#4b0101"];

const rootColor = "#A0E6FF";

export const initOptions = {
	autoResize: true,
	height: '100%',
	width: '100%',
	locale: 'en',
	nodes:{
		shape: 'circle',
	},
	edges:{
		arrows: 'to',
		scaling:{
			label:{
				enabled: true,
			}
		},
		shadow: true,
		smooth: true,
	},
	physics: {
		stabilization: true,
		enabled: true,
		barnesHut: {
			gravitationalConstant: -2000,
			centralGravity: 0,
			springLength: 90,
			springConstant: 0.02,
			damping: 0.09,
			avoidOverlap: 0
		},
	},
	interaction: {
		selectConnectedEdges: false,
	}
};

export class Graph {
	constructor(nodes, edges, addresses, tokens, unusedColors) {
		this.nodes = nodes;
		this.edges = edges;
		this.addresses = addresses;
		this.tokens = tokens;
		this.unusedColors = unusedColors;
	}
	
	update(data, rootAddress) {
		for(var i = 0; i < data.length; i++) {
			var sender = data[i]["from"];
			var recipient = data[i]["to"];
			var timestamp = data[i]["timestamp"];
			var hash = data[i]["hash"];
			var token = "";
			var decimals = 0;
			if(hash == null) {
				hash = data[i]["transactionHash"];
			}
			if("tokenInfo" in data[i]) {
				token = data[i]["tokenInfo"]["symbol"];
				decimals = data[i]["tokenInfo"]["decimals"];
			}
			else {
				token = "ETH";
				decimals = 0;
			}
			if(!(token in this.tokens)) {
				this.tokens[token] = this.assignColor(token);
			}
			var value = Math.round((data[i]["value"]/Math.pow(10, decimals))*1000) / 1000;
			var label = value.toString() + " " + token;
			// Add nodes
			if(!this.addresses[sender]) {
				this.addresses[sender] = this.nodes.length + 1;
				this.nodes.push(this.createNode(sender, (rootAddress == sender)));
			}
			if(!this.addresses[recipient]) {
				this.addresses[recipient] = this.nodes.length + 1;
				this.nodes.push(this.createNode(recipient, (rootAddress == recipient)));
			}
			
			// Add edges
			if(!this.findTransaction(hash)) {
				this.edges.push(this.createEdge(this.addresses[sender], this.addresses[recipient], timestamp, hash, token, label));
			}
		}
		return false;
	}
	
	findTransaction(hash) {
		for(var i=0; i < this.edges.length; i++) {
			if(this.edges[i]["hash"] == hash) {
				return this.edges[i];
			}
		}
		return false;
	}
	
	createNode = function(address, isRoot) {
		var color = "#FEFEFE";
		if(isRoot) {
			color = rootColor;
		}
		var node = {
			id: this.addresses[address],
			address: address,
			size: 40,
			label: address.slice(0,6),
			isRoot: isRoot,
			color: {
				background: color,
				border: color,
				highlight: rootColor,
			},
		}
		return node;
	}

	createEdge = function(sender, recipient, timestamp, hash, token, label) {
		var color = this.tokens[token];
		var edge = {
			from: sender,
			to: recipient,
			timestamp: timestamp,
			hash: hash,
			token: token,
			color: {
				color: color,
				highlight: color,
			},
			label: label,
			font: {
				align: 'middle',
				strokeWidth: 0,
				vadjust: -13,
				color: color,
			},
		};
		return edge;
	}

	assignColor = function(token) {
		var color = "";
		if(this.unusedColors.length == 0) {
			this.unusedColors = availableColors;
		}
		var index = Math.floor(Math.random()*this.unusedColors.length);
		color = this.unusedColors[index];
		this.unusedColors.splice(index, 1);
		return color;
	}
}