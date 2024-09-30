import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import api from '../Services/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';
import toast from 'react-hot-toast';
import TopBar from './TopBar';
import { useNavigate } from 'react-router-dom';

function UpcommingEvents() {

    let navigate = useNavigate();

  const [events, setEvents] = useState([]);


  const fetchEvents = async () => {
    try {
      const response = await api.get(ApiRoutes.UpcommingEvents.path, {authenticate: ApiRoutes.UpcommingEvents.authenticate});
      console.log(response.events)
      if(response && response.events){
        setEvents(response.events);
        toast.success(response.message);
      }else{
        toast.error("No Events Found")
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return <>
    <TopBar/>
    <Container className='mt-4'>
      <div className='d-flex gap-4 flex-wrap'>
        {events.map((event) => (
          <Col md={4} key={event._id}>
            <Card>
              <Card.Img variant="top" src={event.image} />
              <Card.Body>
                <Card.Title>Title: {event.title}</Card.Title>
                <Card.Text> Description: {event.description}</Card.Text>
                <Card.Text>Date: {event.date}</Card.Text>
                <Card.Text>Location: {event.location}</Card.Text>
                <Button variant="primary" onClick={()=>navigate(`/viewMore/${String(event._id)}`)}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </div>
    </Container>
  </>
}

export default UpcommingEvents