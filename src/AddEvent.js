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
	e_type: 'Entertainment',
	e_time: null,
	e_venue: null,
	e_date: null,
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
	"e_type":this.state.e_type,    	
    	"e_time":this.state.e_time,
	"e_venue":this.state.e_venue,
	"e_date":this.state.e_date,
	"uid":this.state.uid
   	};
	console.log(opts);
	axios.post('http://52.172.25.243:5000/addevent',opts)
    	.then(res => {
      	console.log(res);
      	console.log(res.data);
	if(res.data.success==true)
		window.location.replace('http://52.172.25.243:3000/userhome/'+this.state.uid);
	else alert("Timings collide, choose another day");
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
          <select class="e_type" name="e_type" onChange={this.handleChange}>
              <option>Entertainment</option>
              <option>Infotainment</option>
              <option>Awareness</option>
            </select>
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
          <input class='e_time' name='e_time'  onChange={this.handleChange} />
          <br/>
          <text>Venue: </text>
          <input class='e_venue' name='e_venue'  onChange={this.handleChange} />
          <br/>
	<button class="Submit">Submit</button>
      <br />   
        </form>
      </div>
    );
    }
  }

export default AddEvent;
