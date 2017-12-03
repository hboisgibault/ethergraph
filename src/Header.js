import React from 'react';
import './Header.css';
import {Navbar, FormGroup, FormControl, Button} from 'react-bootstrap';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: ""
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleInputSubmit = this.handleInputSubmit.bind(this);
	}
	
	handleInputChange(e) {
		this.setState({
			input: e.target.value
		})
	}
	
	handleInputSubmit(e) {
		e.preventDefault();
		this.props.onInputChange(this.state.input);
	}
	
    render() {
        return (
            <Navbar id="navbar">
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">EtherGraph</a>
                    </Navbar.Brand>
                </Navbar.Header>
				<Navbar.Collapse>
					<Navbar.Form pullLeft>
						<FormGroup>
							<FormControl type="text" 
							             value={this.state.input} 
										 onKeyPress={event => {
											if(event.key === "Enter") {
												this.handleInputSubmit(event);
											}
										 }} 
										 onChange={this.handleInputChange} 
										 placeholder="Address / TX hash" />
						</FormGroup>
						{' '}
						<Button type="submit" onClick={this.handleInputSubmit}>Submit</Button>
					</Navbar.Form>
				</Navbar.Collapse>
            </Navbar>
        );
    }
}
export default Header;