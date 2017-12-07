import React from 'react';
import './Footer.css';

class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
				<div className="container">
					<div className="social">
						<span><b>Follow us &nbsp; </b></span>
						{' '}
						<a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter fa-2" aria-hidden="true"></i></a>
						{' '}<b>&#124;</b>{' '}
						<a href="https://slack.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-slack" aria-hidden="true"></i></a>
						{' '}<b>|</b>{' '}
						<a href="mailto:contact@ethergraph.com"><i className="fa fa-envelope-o" aria-hidden="true"></i></a>
					</div>
					{' '}
					<div className="donation">
						<span><b>&nbsp;&nbsp;&nbsp;&nbsp; Donate &nbsp;</b></span>
						<span>ETH</span>
						{' '}
						<span><a href="https://ethplorer.io/address/0x25092A3a2DD33a7a5e5d8e5c4347374Cc69d2C07" target="_blank" rel="noopener norefferer">0x25092A3a2DD33a7a5e5d8e5c4347374Cc69d2C07</a></span>
					</div>
					<div className="acknowledgments pull-right">
						<span className="text-muted">Powered by ethplorer.io</span>
					</div>	
				</div>	
			</div>
        );
    }
}
export default Footer;