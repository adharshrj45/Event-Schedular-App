import { useState,useEffect } from 'react';
import { fetchEvents } from '../../services/api'
import Table from 'react-bootstrap/Table';
import { deleteEvent } from '../../services/api';

function EventList({fetch}) {
  console.log(fetch);
  
  const [events,setEvents]=useState([]);

  useEffect(() => {
    fetchEvents()
    .then((response)=>setEvents(response.data))
    .catch((err)=>console.error(err));
  }, [fetch])
  
  if(fetch){
    fetchEvents()
  }
  const handleDelete = (id) => {
      deleteEvent(id)
        .then(() => {
          setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
        })
        .catch((err) => console.error('Error deleting event:', err));
  };
  
  return (
    <div className="main" style={{padding:"1rem"}} >
     <h2>Event Scheduler</h2>
     <div style={{ overflowX: 'auto' }}>
     <Table bordered hover responsive>
              <thead >
                <tr>
                  
                  <th>Title</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
     {
        events.map((event)=>(
          <>
            
                <tr>
                  <td key={event._id}>{event.title}</td>
                  <td key={event._id}>{event.description}</td>
                  <td key={event._id}>{new Date(event.date).toLocaleDateString('en-US')}</td>
                  <td key={event._id}>{event.location}</td>
                  <td key={event._id}>
                    <button type="button" className='btn btn-success me-2'><a href={`/viewEvent/${event._id}`}>View</a></button>
                    <button type="button" className='btn btn-primary me-2'><a href={`/editEvent/${event._id}`}>Edit</a></button>
                    <button type="button" onClick={()=>handleDelete(event._id)} className='btn btn-danger '>Delete</button>
                  </td>
                </tr>
              
          </>
        ))
      }
      </tbody>
      </Table>
      </div>
    </div>
  );
}

export default EventList;
