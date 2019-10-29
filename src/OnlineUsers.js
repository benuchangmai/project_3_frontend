import React from 'react'
import './App.css';

class OnlineUsers extends React.Component{

  render() {
    //const {messages} = this.props.messages; list-style-type: none;
    return (
      <ul className = "OnlineUsers-container">
        <div className="OnlineUsersHeader">
          <h1 className="OnlineUsersText">Online Users</h1>
        </div>
        {this.props.onlineUsers.map(m => this.renderUsers(m))}
      </ul>
    );
  }
  renderUsers(User) {

    return (
      <li className="OnlineUsers">
        <div className="User">
         {User}
         </div>
      </li>
    );
  }
}
export default OnlineUsers