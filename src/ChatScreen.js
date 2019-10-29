import React, { Component } from 'react';
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import OnlineUsers from './OnlineUsers'
import './App.css';

class ChatScreen extends Component{
	constructor(props) {
	    super(props);
		    this.state = {
		      messages: [],
		      token: this.props.token,
		      currentUser: this.props.username,
		      users: [],
		      url: this.props.url

		};
		this.atBottom = false
		const proxyurl = "https://cors-anywhere.herokuapp.com/";
    	const url = "http://chat.cs291.com/stream/";
		this.streamSource = new EventSource(this.state.url+"/stream/"+this.state.token);
		this.getToken = this.getToken.bind(this);
		this.setMessageList = this.setMessageList.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.setUsersList = this.setUsersList.bind(this);
		this.joinUsersList = this.joinUsersList.bind(this);
		this.partUsersList = this.partUsersList.bind(this);
		this.changeScrollState = this.changeScrollState.bind(this);
  }
  	getToken(resp){
		this.setState({token: resp})
	}

	setMessageList(resp){
		
		this.setState({messages: [...this.state.messages,resp]})	
	}
	joinUsersList(resp){
		const tempUsers = new Set(this.state.users)
		const joiningUser = resp.message
		const joiningMessage = joiningUser + " has joined the chat"
		resp.message = joiningMessage
		if(!tempUsers.has(joiningUser)){
			this.setState({users: [...this.state.users,joiningUser],
			messages: [...this.state.messages,resp]})
		}		
	}
	partUsersList(resp){
		const tempUsers = new Set(this.state.users)
		const partingUser = resp.message
		const partingMessage = partingUser + " has left the chat"
		resp.message = partingMessage
		tempUsers.delete(partingUser)
		this.setState({users: [...tempUsers],
		messages: [...this.state.messages,resp]})
	}
	setUsersList(resp){
		this.setState({users: resp})
	}

	disconnectConnection(){
		this.streamSource.close()
		this.props.onDisconnect()
	}
	componentDidMount (){
		//this.scrollToBottom();
		 this.streamSource.addEventListener("ServerStatus", (event) => {
		   this.setMessageList({'message': JSON.parse(event.data).status, 'user': 'Server', 
		   	'created': JSON.parse(event.data).created})		  
		});
		 this.streamSource.addEventListener("Message", (event) => {
		   this.setMessageList(JSON.parse(event.data))
		});
		 this.streamSource.addEventListener("Users", (event) => {
		   this.setUsersList(JSON.parse(event.data).users)
		});
		 this.streamSource.addEventListener("Join", (event) => {
		   this.joinUsersList({'message': JSON.parse(event.data).user, 'user': 'Server', 
		   	'created': JSON.parse(event.data).created})
		});
		 this.streamSource.addEventListener("Part", (event) => {
		   this.partUsersList({'message': JSON.parse(event.data).user, 'user': 'Server', 
		   	'created': JSON.parse(event.data).created})
		});
		 this.streamSource.addEventListener("Disconnect", (event) => {
		   this.disconnectConnection()
		});
	}
	sendMessage(message){
		var form = new FormData();
	    form.append("message", message);
	    const url = this.state.url;
	    var request = new XMLHttpRequest();
	    request.open("POST", url + "/message");
	    const userToken = this.state.token
	    request.setRequestHeader(
	        "Authorization",
	        "Bearer " + this.state.token
	    );
	    request.send(form);
	}
	changeScrollState(state){
		this.atBottom = state
	}
	render(){
		return(
			<div className="ChatScreen">
				<div className="ChatHeader">
					<h1 className="ChatHeaderText">Enjoy your chat {this.state.currentUser}</h1>
				</div>
				<div ref={this.messageListRef} className="ChatDetails">
					<OnlineUsers onlineUsers={this.state.users}/>
					<MessageList  messages={this.state.messages}
								changeScrollState={this.changeScrollState} 
								atBottom={this.atBottom}/>
				</div>
				<div className="Message-input-block">
					<SendMessageForm onSubmit={this.sendMessage} />
				</div>
				 
			</div>
			)		
	}
}
export default ChatScreen