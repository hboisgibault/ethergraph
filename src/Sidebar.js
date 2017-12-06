import React from 'react';
import './Sidebar.css';
import Moment from 'react-moment';
import 'moment-timezone';

class Sidebar extends React.Component {
    render() {
		if("hash" in this.props.selectedElement) {
			return (
				<div id="sidebar">
					<div className="sidebar-title">
						<b>Transaction</b>
					</div>
					<div className="sidebar-element"><a href={"https://ethplorer.io/tx/" + this.props.selectedElement["hash"]} target="_blank" rel="noopener noreferrer">{this.props.selectedElement["hash"]}</a></div>
					<div className="sidebar-element">From: <a href={"https://ethplorer.io/address/" + this.props.selectedElement["senderAddress"]} target="_blank" rel="noopener noreferrer">{this.props.selectedElement["senderAddress"]}</a></div>
					<div className="sidebar-element">To: <a href={"https://ethplorer.io/address/" + this.props.selectedElement["recipientAddress"]} target="_blank" rel="noopener noreferrer">{this.props.selectedElement["recipientAddress"]}</a></div>
					<div className="sidebar-element">Date:  <Moment unix format="DD-MM-YYYY, HH:mm:ss" tz="Europe/London">{this.props.selectedElement["timestamp"]}</Moment>{' '} (GMT+1)</div>
					<div className="sidebar-element">Value: {this.props.selectedElement["txValue"]} {this.props.selectedElement["token"]}</div>
				</div>
			);
		}
		else if("address" in this.props.selectedElement){
			return (
				<div id="sidebar">
					<div className="sidebar-title">
						<b>Address</b>
					</div>
					<div className="sidebar-element"><a href={"https://ethplorer.io/address/" + this.props.selectedElement["address"]} target="_blank" rel="noopener norefferer">{this.props.selectedElement["address"]}</a></div>
				</div>
			);
		}
		else {
			return true;
		}
    }
}
export default Sidebar;