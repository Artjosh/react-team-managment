import React, { useState } from 'react';
import './MyNavBar.css';
import { Navbar, Button } from 'react-bootstrap';
import Searchbar from './Searchbar.js';
import addbutton from './addbutton.png';

function MyNavbar({  handleShowForm, handleSearch, handleLogout }) {

  // eslint-disable-next-line no-unused-vars
  const [active, setActive] = useState(false);
  const [active3, setActive3] = useState(false);
  const [loged, setLoged] = useState(true);



const ButtonClose = () => {


  setLoged(!loged)
  handleLogout(loged);
  setActive3(!active3);

};

  return (
    <Navbar expand="lg">
      <Searchbar onSearch={handleSearch} />
      <img src={addbutton} onClick={handleShowForm} alt="addbutton" className="addevent"/>
      <Button style={{ position:'absolute', right: '300px', border:'none' }} onClick={ButtonClose}>Logout</Button>
    </Navbar>
  );
}


export default MyNavbar;