import React from 'react'
import './App.css';

class SendMessageForm extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			text: ''
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onChange(e){
		this.setState({
			text: e.target.value
		})
	}
	onSubmit (e){
		e.preventDefault()
		this.props.onSubmit(this.state.text)
		this.setState({text: ''})

	}
	render(){
		return <div >
		<form ref="form" className="message-form" onSubmit={this.onSubmit}>
			<input className="textfield" type = "text" value={this.state.text} placeholder="Type your message here" onChange={this.onChange}/>
		</form>
		</div>
	}
}

export default SendMessageForm