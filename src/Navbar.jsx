import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="counter"> { this.props.count }  online </div>
      </nav>
    );
  }
}
export default Navbar;