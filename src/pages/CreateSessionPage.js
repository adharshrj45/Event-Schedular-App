import { useState,useEffect } from 'react';
import { fetchEvents } from '../services/api';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { format } from 'date-fns';

function CreateSessionPage() {
    const [events,setEvents]=useState([]);

  useEffect(() => {
    fetchEvents()
    .then((response)=>setEvents(response.data))
    .catch((err)=>console.error(err));
  }, [])

  return (
    <div className="main" style={{padding:"1rem"}} >
     <h2>Events</h2>
     
     {
        events.map((event)=>(
          <>
          <Card key={event._id} className='mb-3'>
            <Card.Header as="h5">{event.title}</Card.Header>
            <Card.Body>
                <Card.Title >{event.description}</Card.Title>
                <Card.Text>{format(new Date(event.date), "do MMMM, yyyy")} | {event.location}</Card.Text>
                <Button variant="success" className='me-2'><a href={`/createSession/${event._id}`}>Create Session</a></Button>
                <Button variant="warning"><a href={`/manageSession/${event._id}`}>Manage Session</a></Button>
            </Card.Body>
            </Card>
          </>
        ))
      }
    </div>
  )
}

export default CreateSessionPage