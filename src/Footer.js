import React from 'react';
import './Footer.css';

class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
				<div className="container">
					<span className="text-muted">Powered by ethplorer.io</span>
				</div>	
			</div>
        );
    }
}
export default Footer;