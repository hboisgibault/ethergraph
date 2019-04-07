import React from 'react';
import './Sidebar.css';
import Infobar from './Infobar';
import TokenList from './TokenList';
import Moment from 'react-moment';
import 'moment-timezone';

class Sidebar extends React.Component {	
    render() {
		return (
			<div id="sidebar">
				<Infobar selectedElement={this.props.selectedElement} />
				<TokenList tokens={this.props.tokens} />
			</div>
		);
    }
}
export default Sidebar;