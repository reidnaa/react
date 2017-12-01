import React, {Component} from 'react';


class ChatBar extends Component {

constructor(props) {
  super(props);
  this.onMessageKeyPress = this.onMessageKeyPress.bind(this);
  this.onUserKeyPress = this.onUserKeyPress.bind(this);
}

onUserKeyPress(event){
  const content = event.target.value;
  //if ( event.key === 'Enter'){
    this.props.changeUserName(content);
  //}
}


onMessageKeyPress(event) {
  let content = event.target.value;
  if ( event.key === 'Enter'){
  this.props.enterSubmit(content);
  event.target.value = '';
  }
}

render() {
    return (
   <footer className="chatbar">
      <input className="chatbar-username" placeholder={this.props.currentUser.name} onBlur={this.onUserKeyPress}/>
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.onMessageKeyPress} />
    </footer>
   );
  }
}
export default ChatBar;