import React from 'react';
import SideBar from '../components/SideBar/SideBar.js'
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import '../components/SideBar/SideBar.css'

export default function HomePage() {

    return(
        <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">      
                      <SideBar />
                    </Col>
                    <Col  xs={10} id="page-content-wrapper">
                        this is a test
                    </Col> 
                </Row>

            </Container>
    );
}