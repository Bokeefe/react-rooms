
import React from 'react';
import ReactDOM from  'react-dom';
import history from './history';

import { Router, Route, NavLink, Switch } from 'react-router-dom';
import './index.css';

// COMPONENTS
import Home from './components/home';
import Room from './components/room';

class App extends React.Component{
    state = {
        roomName: '',
        callSign: ''
    }

    navigateToRoom = (roomName, callSign) => {
        this.setState({roomName: roomName, callSign: callSign});
        history.push('/'+ roomName);
    }

    render(){
        return (
            <Router history={history}>
                <div>
                    <header>
                        <NavLink to="/">Home</NavLink><br/>
                        <hr/>
                    </header>
                    <Switch>
                        <Route path="/:room" component={() => <Room roomName={this.state.roomName} callSign={this.state.callSign}/>}/>
                        <Route path="/" component={() => <Home  parentCallback={this.navigateToRoom} />}/>
                    </Switch>
                </div>
            </Router>
        )}
    }

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
)