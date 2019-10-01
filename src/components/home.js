import React from 'react';
import './home.css';
import {subscribeToTimer} from '../api';

export class Home extends React.Component {
    state = {}
    
    constructor(props){
        super(props);
        this.state = {
            room: '',
            timestamp: 'no time stamp yet'
        }

        this.handleRoomChange = this.handleRoomChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        subscribeToTimer((err, timestamp) => this.setState({ 
            timestamp:  timestamp 
          }));
    }

    handleRoomChange(e){
        this.setState({ room: e.target.value });
    }

    handleFormSubmit(e) {
        this.props.parentCallback(this.state.room);
    }

    render() {
        return (
            <div className="home">
                <p>      This is the timer value: {this.state.timestamp}</p>
                <form>
                    <input type="text" onChange={this.handleRoomChange} placeholder="New Room Name"/>
                    <button type="button" onClick={this.handleFormSubmit}>JOIN ROOM</button>
                </form>
            </div>
        );
    };
}

export default Home;