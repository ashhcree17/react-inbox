import React, { Component } from 'react';
import './App.css';
import MessageList from "./components/MessageList";
import Toolbar from "./components/Toolbar";
import ComposeMessageForm from "./components/ComposeMessageForm"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      messageList: [],
      composeMessage: false
    }
  }

  async componentDidMount() {
    await this.retrieveMessages()
  }

  async retrieveMessages() {
    const messagesResponse = await fetch(`/api/messages`)
    const messagesJson = await messagesResponse.json()

    this.setState({ messageList: messagesJson._embedded.messages })
  }

  toggleCompose() {
    this.setState((prevState) => {
      return {
        messageList: prevState.messageList,
        composeMessage: !prevState.composeMessage
      }
    })
  }

  onUpdate(message) {
    let foundMessage = this.state.messageList.find(
      tempMessage => tempMessage.id === message.id)

    this.setState((prevState) => {
      return {
        messageList: [
          ...prevState.messageList.splice(0, prevState.messageList.indexOf(foundMessage)),
          message,
          ...prevState.messageList.splice(prevState.messageList.indexOf(foundMessage) + 1)
        ]
      }
    })
  }

  async newMessage(message) {
    let response = await fetch(`/api/messages`, 
      {
        method: 'POST',
        body: JSON.stringify(message),
        headers: 
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )

    let messageJson = await response.json()
    this.setState({
      messageList: 
        [
          ...this.state.messageList,
          messageJson
        ],
      composeMessage: false
    })
  }

  async messageListUpdate(command) {
    await fetch(`/api/messages`, 
      {
        method: 'PATCH',
        body: JSON.stringify(command),
        headers: 
          {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
      }
    )
    await this.retrieveMessages()
  }

  handleSelectedMessage(messageList) {
    this.setState({ messageList: messageList })
  }

  render() {
    return (
      <div>
        <Toolbar messageList={this.state.messageList} messageListUpdate={this.messageListUpdate} toggleCompose={this.toggleCompose} handleSelectedMessage={this.handleSelectedMessage} />
        {this.state.composeMessage ? <ComposeMessageForm newMessage={this.newMessage} /> : null}
        <MessageList messageList={this.state.messageList} onUpdate={this.onUpdate} messageListUpdate={this.messageListUpdate} />
      </div>
    );
  }
}

export default App;
