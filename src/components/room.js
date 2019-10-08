import React from 'react';
import history from '../history';
import { joinRoom, joinedRoom } from '../socket';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8080');

class Room extends React.Component {
  state = {
    room: null,
    message: '',
    messages: []
  };

  //   constructor(props) {
  //     super(props);
  //   }

  componentDidMount() {
    if (!this.props.roomName) {
      history.push('/');
    } else {
      this.setState({ room: this.props.roomName });

      joinRoom({ room: this.props.roomName, username: this.props.callSign }, room => {
        if (room.length) {
          this.appendMessage(room.username, room.message);
        }
      });

      socket.on('message', message => {
        this.appendMessage(message.username, message.text);
      });

      joinedRoom(data => {
        console.log('hit joinedRoom', data);
      });
    }
  }

  appendMessage(callSign, message) {
    const concatMsgs = this.state.messages.concat({ callSign: callSign, message: message });
    this.setState({ messages: concatMsgs });
  }

  handleChatMessage(e) {
    this.setState({ message: e.target.value });
  }

  render() {
    return (
      <div>
        Welcome to {this.props.roomName}
        <input type="text" onChange={this.handleSendChat} placeholder="type here" />
        <button type="button">chat</button>
        <div>
          {this.state.messages.map(function(item) {
            return (
              <div className="message">
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
