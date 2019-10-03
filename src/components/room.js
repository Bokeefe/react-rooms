import React from 'react';
import history from '../history';
import { joinRoom, message } from '../api';

class Room extends React.Component {
  state = {
    room: null,
    messages: [
      { callSign: 'briggs', message: 'reporting for duty' },
      { callSign: 'subs', message: 'think about it' }
    ]
  };

  constructor(props) {
    super(props);
    message(message => {
      console.log(message);
    });
  }

  componentDidMount() {
    if (!this.props.roomName) {
      history.push('/');
    } else {
      this.setState({ room: this.props.roomName });
      joinRoom({ room: this.props.roomName, username: this.props.callSign }, room => {
        this.appendMessage(room.username, room.message);
      });
    }

    this.appendMessage('DogHair', 'friggin pony up');
  }

  appendMessage(callSign, message) {
    const concatMsgs = this.state.messages.concat({ callSign: callSign, message: message });
    this.setState({ messages: concatMsgs });
  }

  render() {
    return (
      <div>
        Welcome to {this.props.roomName}
        <div>
          {this.state.messages.map(function(item) {
            return (
              <div className="messages">
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
