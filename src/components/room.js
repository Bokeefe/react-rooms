import React from 'react';
import history from '../history';
import openSocket from 'socket.io-client';
import { NavLink } from 'react-router-dom';
import './room.css';

const socket = openSocket('http://localhost:8080');

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.handleChatMessage = this.handleChatMessage.bind(this);
    this.send = this.send.bind(this);
    this.setState({
      roomName: this.props.roomName
        ? this.props.roomName
        : history.location.pathname.replace('/', '')
    });
  }

  state = {
    callSign: this.props.callSign,
    roomName: this.props.roomName,
    message: '',
    messages: []
  };

  componentDidMount() {
    const roomName = this.props.roomName
      ? this.props.roomName
      : history.location.pathname.replace('/', '');

    const callSign = this.props.callSign ? this.props.callSign : this.createCallSign();

    this.setState({ callSign: callSign, roomName: roomName }, () => {
      socket.emit(
        'joinRoom',
        { room: this.state.roomName, username: this.state.callSign },
        room => {
          if (!room.nameTaken) {
            this.appendMessage(room.username, room.message);
          }
        }
      );
    });

    socket.on('message', message => {
      this.appendMessage(message.username, message.text);
    });
  }

  appendMessage(callSign, message) {
    if (this.state.messages.length > 4) {
      this.state.messages.shift();
    }
    if (message) {
      const concatMsgs = this.state.messages.concat({ callSign: callSign, message: message });
      this.setState({ messages: concatMsgs });
    }
  }

  createCallSign() {
    const callSign = prompt('create a callsign for the game room:');
    if (callSign) {
      this.setState({ callSign: callSign });
      return callSign;
    } else {
      history.push('/');
      return null;
    }
  }

  handleChatMessage(e) {
    if (e.keyCode !== 13) {
      this.setState({ message: e.target.value });
    } else {
      this.send();
    }
  }

  send() {
    socket.emit('message', {
      username: this.state.callSign,
      text: this.state.message
    });

    document.getElementById('message').value = '';
    this.setState({ message: '' });
  }

  render() {
    return (
      <div className="room">
        <div>
          <NavLink to="/">
            <span role="img" aria-label="home icon">
              🏰
            </span>
          </NavLink>
          Welcome to {this.state.roomName}
        </div>
        <div className="msg-container">
          <div className="messages">
            {this.state.messages.map(function(item, index) {
              return (
                <div key={index}>
                  <span>
                    <b>{item.callSign}</b>: {item.message}
                  </span>
                </div>
              );
            })}
          </div>
          <div>
            <input
              id="message"
              type="text"
              onKeyUp={this.handleChatMessage}
              placeholder="type here"
            />
            <button type="button" onClick={this.send}>
              chat
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Room;
