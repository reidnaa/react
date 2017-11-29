import React, {Component} from 'react';


class ChatBar extends Component {

constructor(props) {
    super(props);
this.onMessageKeyPress = this.onMessageKeyPress.bind(this);
}


onMessageKeyPress(event) {
  let content = event.target.value;

    //console.log(content);
if ( event.key === 'Enter'){

this.props.enterSubmit(content);
event.target.value = '';

}
}

 render() {
  //console.log("Rendering the chatbar");
    return (

   <footer className="chatbar">
      <input className="chatbar-username" defaultValue={this.props.currentUser.name} />
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.onMessageKeyPress} />
    </footer>

   );
  }
}
export default ChatBar;