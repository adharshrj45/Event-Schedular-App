import { useState, useEffect } from 'react';
import { fetchEvents } from '../services/api';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { format } from 'date-fns';

function ViewEvents() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [finishedEvents, setFinishedEvents] = useState([]);

  useEffect(() => {
    fetchEvents()
      .then((response) => {
        const today = new Date();

        // Separate upcoming and finished events
        const upcoming = response.data
          .filter((event) => new Date(event.date) >= today) // Upcoming events
          .sort((eventA, eventB) => new Date(eventA.date) - new Date(eventB.date)); // Sort by date (earliest first)

        const finished = response.data
          .filter((event) => new Date(event.date) < today) // Finished events
          .sort((eventA, eventB) => new Date(eventB.date) - new Date(eventA.date)); // Sort by date (latest first)

        setUpcomingEvents(upcoming);
        setFinishedEvents(finished);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="main" style={{ padding: '1rem' }}>

      {/* Upcoming Events Section */}
      <h3>Upcoming Events</h3>
      {upcomingEvents.length > 0 ? (
        upcomingEvents.map((event) => (
          <Card  key={event._id} className="mb-3 custom-card">
           <Card.Header as="h5">{event.title}</Card.Header>
            <Card.Body>
              <Card.Title>{event.description}</Card.Title>
              <Card.Text> {format(new Date(event.date), "do MMMM, yyyy")} | {event.location}</Card.Text>
              <Button variant="primary">
                <a href={`/viewSession/${event._id}`} style={{ color: 'white', textDecoration: 'none' }}>
                  View Sessions
                </a>
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No upcoming events.</p>
      )}

      {/* Finished Events Section */}
      <h3>Finished Events</h3>
      {finishedEvents.length > 0 ? (
        finishedEvents.map((event) => (
          <Card key={event._id} className="mb-3 custom-card">
            <Card.Header as="h5">{event.title}</Card.Header>
            <Card.Body>
              <Card.Title>{event.description}</Card.Title>
              <Card.Text>{format(new Date(event.date), "do MMMM, yyyy")} | {event.location}</Card.Text>
              <Button variant="primary">
                <a href={`/viewSession/${event._id}`} style={{ color: 'white', textDecoration: 'none' }}>
                  View Sessions
                </a>
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No finished events.</p>
      )}
    </div>
  );
}

export default ViewEvents;
