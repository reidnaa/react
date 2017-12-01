import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx';

//
class App extends Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.state ={
    currentUser: {name: "rando"},
    messages: [],
    count: 0

    }
  this.changeUserName = this.changeUserName.bind(this);
  this.enterSubmit = this.enterSubmit.bind(this);
}
//
changeUserName(content){
  this.setState({ currentUser : {name: content } });
  let oldName = this.state.currentUser.name;
  let notification = oldName + ' has change username to ' + content ;
  if (oldName !== content){
    let newMessage = {
      content: notification,
      type: 'postNotification'
    }
  this.socket.send(JSON.stringify(newMessage));
  }

}

//
enterSubmit(content) {
 let message = {
    id: '',
    username: this.state.currentUser.name ,
    content: content,
    type: 'postMessage'
    }
 this.socket.send(JSON.stringify(message));
}

//
componentDidMount() {
  this.socket = new WebSocket('ws://0.0.0.0:3001');
  this.socket.addEventListener("message", (message) => {
    let holderObj = JSON.parse(message.data);
    if (holderObj.type === 'count'){
      this.state.count = holderObj.countSize;
      this.setState({count : holderObj.countSize});
      } else {
        this.setState({ messages : this.state.messages.concat(holderObj) });
      }
  });
}

//
 render() {
    return (
    <div>
     <Navbar count={this.state.count} />
      <MessageList messages={this.state.messages}/>
      <ChatBar enterSubmit={this.enterSubmit} currentUser={this.state.currentUser} changeUserName={this.changeUserName } />
    </div>
    );
  }
}
export default App;




