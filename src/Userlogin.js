import React from 'react'
import './App.css';

class Userlogin extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			username: '',
			password: '',
			url: this.props.url
		}
		this.onChangeUsername = this.onChangeUsername.bind(this)
		this.onChangePwd = this.onChangePwd.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.onChangeUrl = this.onChangeUrl.bind(this)
	}
	onChangeUrl(e){
		this.setState({
			url: e.target.value
		})
	}
	onChangeUsername(e){
		this.setState({
			username: e.target.value
		})
	}
	onChangePwd(e){
		this.setState({
			password: e.target.value
		})
	}
	onSubmit (e){
		e.preventDefault()
		this.props.onSubmit(this.state.username,this.state.password, this.state.url)
	}
	render(){
		return <div>
		<form className="login-form" onSubmit={this.onSubmit}>
			<input type = "text" value={this.state.url} placeholder="Chat URL" onChange={this.onChangeUrl}/>
			<input type = "text" placeholder="Username" value={this.state.username} onChange={this.onChangeUsername}/>
			<input type = "password" placeholder="Password" value={this.state.password} onChange={this.onChangePwd}/> 
			<input type = "submit" className="Loginbutton" value="Login"/>
		</form>
		</div>
	}
}

export default Userlogin