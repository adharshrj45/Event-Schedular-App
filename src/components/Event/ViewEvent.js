import { useState, useEffect } from "react";
import { fetchEventsById } from "../../services/api";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Breadcrumb from 'react-bootstrap/Breadcrumb';


function ViewEvent() {
  const [events, setEvents] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchEventsById(id)
      .then((response) => setEvents([response.data]))
      .catch((err) => console.error(err));
  }, [id]);
  console.log(events);

  return (
    <Container className="mt-4">
      <Breadcrumb>
        <Breadcrumb.Item><Link to="/" style={{ textDecoration: 'none' ,color:"black"}}>Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item active>View Event</Breadcrumb.Item>
      </Breadcrumb>
      <h2 className="mb-4">Event Details</h2>
      {events.map((event) => (
        <Card key={event._id} className="mb-3">
          <Card.Header as="h5">{event.title}</Card.Header>
          <Card.Body>
            <Card.Text>
              <strong>Description:</strong> {event.description}
            </Card.Text>
            <Card.Text>
              <strong>Date:</strong> {new Date(event.date).toLocaleDateString("en-US")}
            </Card.Text>
            <Card.Text>
              <strong>Location:</strong> {event.location}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default ViewEvent;
