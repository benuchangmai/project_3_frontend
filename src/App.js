import React, { Component } from 'react';
import './App.css';
import Userlogin from './Userlogin'
import ChatScreen from './ChatScreen'

class App extends Component {
  constructor(){
    super()
    this.state = {
      currentScreen: sessionStorage.getItem( 'currentScreen' ) || 'LoginScreen',
      currentUsername: sessionStorage.getItem( 'currentUsername' ) || '',
      token: sessionStorage.getItem( 'token' ) || '',
      url: 'http://chat.cs291.com/'
    }
    this.onUserloginSubmit = this.onUserloginSubmit.bind(this)
    this.onDisconnect = this.onDisconnect.bind(this)
  }

  onUserloginSubmit (username, password, url){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var request = new XMLHttpRequest();
    var form = new FormData();
    form.append("password", password);
    form.append("username", username);
    sessionStorage.url = url;
    request.open("POST", sessionStorage.url + "/login");
    request.onreadystatechange = function(){
        if (request.readyState !== 4) return;
        if (request.status === 201) {
            sessionStorage.setItem( 'token', JSON.parse(request.responseText).token);
            sessionStorage.setItem( 'currentScreen',"ChatScreen");
            sessionStorage.setItem( 'currentUsername',username);
            this.setState({
            currentUsername: username,
            currentScreen: sessionStorage.getItem( 'currentScreen'),
            token: sessionStorage.getItem( 'token' )
            });
        } else if (this.status === 403) {
            alert("Invalid username or password");
        } else {
            alert(this.status + " failure to /login");
        }
    }.bind(this);
    request.send(form);  
    
  }
  onDisconnect(){
    this.setState({currentScreen: 'LoginScreen'})
  }
  render() {
    if(this.state.currentScreen === 'LoginScreen'){
     return <Userlogin onSubmit={this.onUserloginSubmit} 
     url={this.state.url}/>
    }
    else if(this.state.currentScreen === 'ChatScreen'){
      return <ChatScreen token={this.state.token}
                         username ={this.state.currentUsername}
                         url={sessionStorage.url}
                         onDisconnect={this.onDisconnect} />
    }

  }
}

export default App;