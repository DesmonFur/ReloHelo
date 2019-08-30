import React from 'react';
import './App.css';
import routes from './routes'
import Nav from './components/Nav'
import Auth from './components/Auth'
import {withRouter} from 'react-router-dom'
function App(props) {
  console.log(props)
  return (
    <div className="App">
      {props.location.pathname === '/' ? <Auth />: <div> <Nav /> {routes} </div>}
    </div>
  );
}

export default withRouter(App);
