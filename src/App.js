import React from 'react'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import Chatkit from '@pusher/chatkit-client'
import MessageList from './MessageList'
import Message from './Message'
import SendMessageForm from './SendMessageForm'

import { tokenUrl, instanceLocator } from './config'



class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      messages: []
    }

    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
        instanceLocator,
        userId: 'perborgen',
        tokenProvider: new Chatkit.TokenProvider({
            url: tokenUrl
        })
    })
    
    chatManager.connect()
    .then(currentUser => {
      this.currentUser = currentUser
      this.currentUser.subscribeToRoom({
        roomId: "517c600d-c933-4d61-a4f5-86e5d2ab9921",
        hooks: {
          onMessage: message => {
            //console.log('message.text: ', message.text);
            this.setState({
              messages: [...this.state.messages, message]
            })
          }
        },
        messageLimit: 10
      })
    })
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: "517c600d-c933-4d61-a4f5-86e5d2ab9921"
    })
  }

  render() {
    //console.log('this.state.messages:', this.state.messages);
    return(
      <div className="app">
          <MessageList messages={this.state.messages} />
          <SendMessageForm sendMessage={this.sendMessage}/>
       </div>
    );
  }
}



export default App