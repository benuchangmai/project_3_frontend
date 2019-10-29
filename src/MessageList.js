import React from 'react'
import './App.css';
import Popup from './Popup'

class MessageList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showPopup: false
    }
    this.atBottom = true
    this.messageFromSelf = true
    this.togglePopup = this.togglePopup.bind(this)
  }
  togglePopup = () => {
    this.scrollToBottom();
    this.atBottom = true;
    this.setState({showPopup: false});
    }
  componentDidMount() {
    if(!this.props.atBottom && this.messageFromSelf){
            this.scrollToBottom();}
    else if(this.props.atBottom){
          this.scrollToBottom();}
  }
  
  componentDidUpdate() {
    if(!this.props.atBottom && this.messageFromSelf){
            this.scrollToBottom();}
    else if(this.props.atBottom){
          this.scrollToBottom();}
  }

  scrollToBottom = () => { 
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    this.props.changeScrollState(true);
    console.log("At bottom: ",true)
    
  }

  handleScroll = e => {
    let element = e.target
    console.log(element.scrollHeight, element.scrollTop, element.clientHeight)
    if (element.scrollHeight - element.scrollTop - 1 < element.clientHeight) {
      this.props.changeScrollState(true); 
      this.atBottom = true
      console.log("At bottom from handleScroll: ",true)
      this.setState({showPopup: false})
    }
    else{
      this.props.changeScrollState(false);  
      this.atBottom = false
      console.log("At bottom from handleScroll: ",false)
    }
  }
  render() {
    console.log("Initial: ", this.atBottom)
    console.log("showPopup: ", this.state.showPopup)
    return (
      <ul className = "MessageList-container" onScroll={this.handleScroll}>
        {this.props.messages.map(m => this.renderMessage(m))}
        {(this.state.showPopup || !this.atBottom)? <Popup closePopup={this.togglePopup.bind(this)}/>: null}
        <li style={{ float:"left", clear: "both" }}
        ref={(el) => { this.messagesEnd = el; }}>
        </li>
      </ul>
    );
  }

  renderMessage = (message) => {

    const member = message.user;
    const text = message.message;
    var date = new Date(message.created*1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    const created = hours + ':' + minutes.substr(-2)
    const serverMessage = member === 'Server';
    const messageType = serverMessage?
    	"Server" : "Message";
    const sender = serverMessage?
    	"" : member;
    const currentMember = sessionStorage.getItem( 'currentUsername' );
    const messageFromMe = sender === currentMember;
    const className = messageFromMe ?
      "Messages-message-currentMember" : "Messages-message";
    if(messageFromMe)
      this.messageFromSelf = true
    else
      this.messageFromSelf = false
    return (
      <li className={messageType} >
      	<div className = {className}>
  	      <div className="Message-content">
  	        <div className="username">
  	          {sender}
  	        </div>
  	        <div className="message-body">
  		        <div className="text">{text}</div>
  		        <div className="created">{created}</div>
  	        </div>
  	      </div>
  	    </div>
      </li>
    );
  }
}
export default MessageList