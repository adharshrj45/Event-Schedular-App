import { useState, useEffect } from "react";
import { getSessionsByEvent } from "../../services/api";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import  Alert  from 'react-bootstrap/Alert';



function ViewSession() {
  const [sessions, setSessions] = useState([]);
  const { eventId } = useParams();

  useEffect(() => {
    getSessionsByEvent(eventId)
      .then((response) =>{ 
        setSessions(response.data)
      })
      .catch((err) => console.error(err));
  }, [eventId]);
  console.log(sessions);

  return (
    <Container className="">
      <Breadcrumb>
        <Breadcrumb.Item><Link to="/viewEvents" style={{ textDecoration: 'none' ,color:"black"}}>Events</Link></Breadcrumb.Item>
        <Breadcrumb.Item active>Sessions</Breadcrumb.Item>
      </Breadcrumb>
      <h2 className="mb-4">Event Details</h2>
      {sessions.length === 0 && (
        <Alert variant={'warning'}>No sessions available for this event</Alert>
      )}

      {sessions.map((session) => (
        <Card key={session._id} className="mb-3">
          <Card.Header as="h5">{session.title}</Card.Header>
          <Card.Body>
            <Card.Text>
              <strong>Time:</strong> {session.startTime} - {session.endTime}
            </Card.Text>
            <Card.Text>
              <strong>Speaker:</strong> {session.speaker}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default ViewSession;
