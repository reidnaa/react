import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx';

const dataBase = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
      id: 1
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
      id: 2
    }
  ]
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state =
      dataBase;
      this.enterSubmit = this.enterSubmit.bind(this);

}

enterSubmit(content) {
  console.log( "test:", content);
 let key = this.state.messages.length + 1;


  const newMessage = {id: key ,username: "Michelle", content: content};
  const messages = this.state.messages.concat(newMessage)
  this.setState({messages: messages});
}


componentDidMount() {
  ///console.log("componentDidMount <App />");
  setTimeout(() => {
    //console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}

 render() {
    //console.log("Rendering <App/>");
    //console.log(this.state.messages);
    return (
    <div>
      <MessageList messages = {this.state.messages}/>
      <ChatBar enterSubmit={this.enterSubmit} currentUser={this.state.currentUser}/>
    </div>
    );
  }
}
export default App;