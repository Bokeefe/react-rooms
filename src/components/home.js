import React from 'react';
import './home.css';
import { subscribeToRooms } from '../socket';

export class Home extends React.Component {
  state = {
    callSign: '',
    rooms: [],
    pickedRoom: ''
  };

  constructor(props) {
    super(props);
    this.handleNewCallSign = this.handleNewCallSign.bind(this);

    this.handleNewRoom = this.handleNewRoom.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onPickRoom = this.onPickRoom.bind(this);
  }

  componentDidMount() {
    subscribeToRooms(rooms => this.setState({ rooms: rooms }));
  }

  handleNewCallSign(e) {
    this.setState({ callSign: e.target.value });
  }

  handleNewRoom(e) {
    this.setState({ pickedRoom: e.target.value });
  }

  handleFormSubmit(e) {
    this.props.parentCallback(this.state.pickedRoom, this.state.callSign);
  }

  onPickRoom(e) {
    this.setState({ pickedRoom: e.target.value });
  }

  render() {
    return (
      <div className="home">
        <form>
          <select onChange={this.onPickRoom}>
            <option value="Pick existing room" key="Pick existing room">
              ▼ Pick existing room ▼
            </option>
            {this.state.rooms.map(room => (
              <option value={room.roomName} key={room.key}>
                {room.roomName}
              </option>
            ))}
          </select>
          <input type="text" onChange={this.handleNewCallSign} placeholder="Your Call Sign" />

          <input type="text" onChange={this.handleNewRoom} placeholder="New Room Name" />

          <button type="button" onClick={this.handleFormSubmit}>
            JOIN ROOM
          </button>
        </form>
      </div>
    );
  }
}

export default Home;
