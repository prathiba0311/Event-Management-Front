import React from 'react';
import './Styles/Userhome.css';
import axios from 'axios';

class Userhome extends React.Component {
    constructor()
    {
        super();
	    this.state={
            userid: null,
		    eventslist: [],
        }
    }

    componentDidMount() {
        axios.get(`http://52.172.25.243:5000/userhome`)
          .then(res => {
            console.log(res);
            console.log(res.data);
            const data = res.data;
            if(data.success===true)
                this.setState({
                    userid: data.uid,
                    eventslist: data.events
                });
          }).catch(error => {
              console.log(error);
          })
    }

    deleteEvent = (id) => {
        var opts={
            "id":id,
           };
        axios.post('http://52.172.25.243:5000/delete-event',opts)
    	.then(res => {
      	console.log(res);
      	console.log(res.data);
            if(res.data.success===true) {
                this.removeEvent(id)
            }
    	}).catch(error => {
      	console.log(error);
    	})
    }

    removeEvent = (id) => {
        const templist = this.state.eventslist;
        templist.map((event) => {
            if(event.e_id === id) {
                event.e_id = -1;
            }
        })
        this.setState({
            eventslist: templist
        })
    }

    addEvent = () => {
        window.location.replace('http://52.172.25.243:3000/Addevent');
    }
    render()
    {
        return (
            <div class="Component">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Event ID</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Type</th>
                            <th>Venue</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.eventslist.map((event) => {
                            if (event.e_id !== -1)  return (
                             <tr>
                                 <td>{event.e_id}</td>
                                 <td>{event.e_type}</td>
                                 <td>{event.e_time}</td>
                                 <td>{event.e_date}</td>
                                 <td>{event.e_venue}</td>
                                 <td><button class="Button" onClick = {() => this.deleteEvent(event.e_id)}>Cancel Booking</button></td>
                             </tr>
                            )
                        })}
                     </tbody>
                </table>
                <button class="Button" onClick = {this.addEvent}>Add new Event</button>
            </div>
        );
    }
}

export default Userhome;
