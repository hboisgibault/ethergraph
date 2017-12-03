import React from 'react';
import './Sidebar.css';

class Sidebar extends React.Component {	
    render() {
        return (
            <div id="sidebar">
				{this.props.selectedElement["from"]}
			</div>
        );
    }
}
export default Sidebar;