import React from "react";
import dashboardimg from "../../images/dashboardimg.png"
import logo from "../../images/deliodor_logo.png"
import Card from "react-bootstrap/Card";
import "./Intro.css";

export default function Intro(props){
    return(
    <div className="Intro">
    <Card className='MainCard shadow-lg p-3 mb-5 bg-white rounded'>
    <Card.Body>
      <img class='logo' src={logo}/>
      <p>An application that delivers orders to your door step.</p>
        <img class='dashboardimg' src={dashboardimg}/>
      </Card.Body>
      </Card>
    </div>
);
}