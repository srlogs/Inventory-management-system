import React from "react";
import {Nav} from "react-bootstrap";
import './SideBar.css'

export default function SideBar (props){
    return (
            <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
            <Nav.Item>
                <Nav.Link href="/home">Active</Nav.Link>
            </Nav.Item>
            </Nav>
        );
  };