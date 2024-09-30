import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Profile from '../assets/profile.png'
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import '../Components/Styles/MemberShipStyle.css'
import { Link } from 'react-router-dom';

function MemberShip(){
  return (
    <Container className='Main-Container'>
      <Row >
        <Col md={3}>
          <img src={Profile} alt="User Profile" className="img-fluid" />
        </Col>
        <Col md={9} className='mt-4 mr-4 d-flex flex-column justify-item-center align-items-center'>
          <h2>Become as a Member</h2>
          <h6 className=''>You can create your own events and manage yourself</h6>
            <Link to='/memberForm'><FaRegArrowAltCircleRight size={30}/></Link>
        </Col>
      </Row>
    </Container>
  );
}

export default MemberShip
