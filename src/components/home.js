import React from 'react';
import './home.css'
export class Home extends React.Component {
    state = {
        room: ''
    }
    
    constructor(props){
        super(props);
        this.handleRoomChange = this.handleRoomChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
                <form>
                    <input type="text" onChange={this.handleRoomChange} placeholder="New Room Name"/>
                    <button type="button" onClick={this.handleFormSubmit}>JOIN ROOM</button>
                </form>
            </div>
        );
    };
}

export default Home;