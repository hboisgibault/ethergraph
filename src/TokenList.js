import React from 'react';
import './TokenList.css';

class TokenList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visibleTokens: null,
		};
		this.handleCheckedChange = this.handleCheckedChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		var checkBoxes = (!this.state.visibleTokens) ? {} : this.state.visibleTokens;
		for(var t in nextProps.tokens) {
			if(!(t in checkBoxes)) {
				checkBoxes[t] = true; // true if box checked and token is visible
			}
		}
		this.setState({
			visibleTokens: checkBoxes 
		});
	}
	
	handleCheckedChange(event) {
		var target = event.target;
		var vTokens = this.state.visibleTokens;
		if(!target.checked) {
			vTokens[target.value] = false;
 		}
		else {
			vTokens[target.value] = true;
		}
		this.setState({
			visibleTokens: vTokens,
		});
		this.props.onVisibleChange(this.state.visibleTokens);
	}

    render() {
		return (
		<div id="token-list">
			<div className="sidebar-title">
				<b>Tokens</b>
			</div>
			<form>
			<div className="token-list">
			{
				Object.keys(this.props.tokens).map(tokenName => (
					<div className="checkBox sidebar-element" key={ tokenName }>
						<label style={{color: this.props.tokens[tokenName]}}>
							<input type="checkBox" value={ tokenName } onChange={this.handleCheckedChange} 
								checked={ this.state.visibleTokens[tokenName] } />
							&nbsp;{ tokenName }
						</label>
					</div>
				))
			}
			</div>
			</form>
		</div>
		);
    }
}
export default TokenList;