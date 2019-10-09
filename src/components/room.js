import React from 'react';
import history from '../history';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8080');

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.handleChatMessage = this.handleChatMessage.bind(this);
    this.send = this.send.bind(this);
  }

  state = {
    room: null,
    message: '',
    messages: []
  };

  componentDidMount() {
    if (!this.props.roomName) {
      history.push('/');
    } else {
      this.setState({ room: this.props.roomName });

      socket.emit(
        'joinRoom',
        { room: this.props.roomName, username: this.props.callSign },
        room => {
          if (!room.nameTaken) {
            this.appendMessage(room.username, room.message);
          }
        }
      );

      socket.on('message', message => {
        this.appendMessage(message.username, message.text);
      });
    }
  }

  appendMessage(callSign, message) {
    if (message) {
      const concatMsgs = this.state.messages.concat({ callSign: callSign, message: message });
      this.setState({ messages: concatMsgs });
    }
  }

  handleChatMessage(e) {
    this.setState({ message: e.target.value });
  }

  send() {
    console.log(this.state.message);
    socket.emit('message', {
      username: this.props.callSign,
      text: this.state.message
    });

    document.getElementById('message').value = '';
    this.setState({ message: '' });
  }

  render() {
    return (
      <div className="room">
        Welcome to {this.props.roomName}
        <input id="message" type="text" onChange={this.handleChatMessage} placeholder="type here" />
        <button type="button" onClick={this.send}>
          chat
        </button>
        <div>
          {this.state.messages.map(function(item, index) {
            return (
              <div className="message" key={index}>
                <p>
                  <b>{item.callSign}</b>: {item.message}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Room;
