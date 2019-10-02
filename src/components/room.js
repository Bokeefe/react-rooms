import React from 'react';
import history from '../history';
import {joinRoom, message} from '../api';

class Room extends React.Component {
    state = {
        room: null
    }

    componentDidMount(){
        if(!this.props.roomName) {
            history.push('/');
        } else {
            this.setState({room: this.props.roomName});
            joinRoom({room: this.props.roomName,  username:this.props.callSign}, (room) => {
                  
                
            });

            message((message) => {
                console.log(message);
                // document.getElementById('messages').append(`<p><b>${message.username}</b> ${message.message}</p>`);
            })
        }
    }

    render(){
         return (
            <div>
                Welcome to {this.props.roomName}
                <div id="messages"></div>
            </div>
        )   
    }

}

export default Room;