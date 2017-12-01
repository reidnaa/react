import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("this here ", this.props);

    if ( this.props.type === 'incomingNotification'){

      return (
        <div className="message system">
          { this.props.content }
        </div>

      );
    } else {

    return (

      <div>
        <div className="message">
          <span className="message-username">{ this.props.user }</span>
          <span className="message-content">{ this.props.content } </span>
        </div>

      </div>
    );
  }
  }
}
export default Message;
