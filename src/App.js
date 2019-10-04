import React from 'react';
import Login from './Login';
 import Register from './Register';
import AddEvent from './AddEvent';
import './Styles/App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
	
	return (
	<Router> 	
		<Route path="/Login" component={Login} />
		<Route path="/Register" component={Register} />
		<Route path="/AddEvent" component={AddEvent} />
	</Router>       
    // <Register />
    //<AddEvent />
  );
}

export default App;
