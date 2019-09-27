import React from 'react';

import history from '../history';

class Room extends React.Component {
    componentDidMount(){
        if(!this.props.roomName) {
            history.push('/');
        }
    }
    render(){
         return (
        <div>
            Welcome to {this.props.roomName}
        </div>
    )   
    }

}

export default Room;