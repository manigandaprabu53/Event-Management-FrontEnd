import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import EventCard from './EventCard'; // Assuming EventCard is in a separate file


export default function Events({events}) {
  let event = events

  return (
    <Container>
      <Row>
        {event?event.map((event, index) => (
          <Col key={index} md={4}>
            <EventCard event={event} />
          </Col>
        )): <div></div>}
      </Row>
    </Container>
  );
}
