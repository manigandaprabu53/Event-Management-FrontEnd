import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function EventCard({ event }) {
  return (
    <Card>
      <Card.Img variant="top" src={event.image} />
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Text>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Date:</strong> {event.date}</p>
        </Card.Text>
        <Button variant="primary">View More</Button>
      </Card.Body>
    </Card>
  );
}

