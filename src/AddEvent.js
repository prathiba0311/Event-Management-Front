import React from 'react';
import style from './Styles/AddEvent.css';
import DatePicker from 'react-datepicker';
import axios from 'axios';
// import moment from 'moment';

class AddEvent extends React.Component {

    constructor() {
      super();
      this.state = {
        startDate: new Date(),
	category: 'Entertainment',
	Name: null,
	time: null,
	venue: null,
	det: null,
	uid: null
      }
      //this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange=(event) => {
      event.preventDefault();
    	const { name, value } = event.target;
	console.log(name);
	this.setState({[name]: value});
    }
    handleSubmit=(event) => {
	event.preventDefault();
	var opts={
	"cat":this.state.category,    	
	"name":this.state.Name,
    	"time":this.state.time,
	"venue":this.state.venue,
	"det":this.state.det,
	"uid":this.state.uid
   	};
	console.log(opts);
	axios.post('http://52.172.25.243:5000/addevent',opts)
    	.then(res => {
      	console.log(res);
      	console.log(res.data);
	if(res.data.success==true)
		window.location.replace('http://52.172.25.243:3000/Login')
    	}).catch(error => {
      	console.log(error);
    	})
    }
	
    render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <text>User Id: </text>
          <input class='uid' name='uid'  onChange={this.handleChange} />
          <br/>
	  <text>Event Category: </text>
          <select class="category" name="category" onChange={this.handleChange}>
              <option>Entertainment</option>
              <option>Infotainment</option>
              <option>Awareness</option>
            </select>
          <br/>
          <text>Event name: </text>
          <input class='Name' name='Name'  onChange={this.handleChange} />
          <br/>
          <text>Date: </text>
          {/* <DatePicker 
              // id='date' name='date' required
              // dateFormat="dd/MM/yyyy"
              selected={this.state.startDate}
              onChange={this.handlChange}
          /> */}
          <br/>
          <text>Time Slot: </text>
          <input class='time' name='time'  onChange={this.handleChange} />
          <br/>
          <text>Venue: </text>
          <input class='venue' name='venue'  onChange={this.handleChange} />
          <br/>
          <text>Event details (requirements): </text>
          <input class='det' name='det' onChange={this.handleChange} />
	  <br/>
	<button class="Submit">Submit</button>
      <br />   
        </form>
      </div>
    );
    }
  }

export default AddEvent;
