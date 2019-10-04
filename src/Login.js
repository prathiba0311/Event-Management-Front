import React from 'react';
import './Styles/Login.css'
import Register from './Register';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
function reg() {
  return (
    <Register/ >
  );
}

class Login extends React.Component {

  constructor() {
    super();
	this.state={
		UserName: null,
		Password: null
	}
  }

handleChange = (event) => {
	event.preventDefault();
    	const { name, value } = event.target;
	console.log(name);
	this.setState({[name]: value});
}
handleSubmit = (event) =>{
	event.preventDefault();
	var opts={
    	"id":this.state.UserName,
    	"passwd":this.state.Password,
   	};
	console.log(opts);
	axios.post('http://52.172.25.243:5000/login',opts)
    	.then(res => {
      	console.log(res);
      	console.log(res.data);
	if(res.data.success==true)
		window.location.replace('http://52.172.25.243:3000/userhome/'+this.state.UserName);
	else alert("Wrong Username or Password");
    	}).catch(error => {
      	console.log(error);
    	})
	
	
}
  render() {
  return (
	<form onSubmit={this.handleSubmit}>       
	   
	<div class="Component">
      <input class="UserName" placeholder="UserName" name="UserName"  onChange={this.handleChange} />
      <br />
      <input class="Password" placeholder="Password" name="Password" onChange={this.handleChange} />
      <br />
      <button class="SignIn">Sign In</button>
      <br />    
	<a class="Register" href="http://52.172.25.243:3000/Register">New User? Register Here</a>
</div>
      
      </form>
  );
  }
}

export default Login;
