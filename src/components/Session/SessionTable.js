import { useState,useEffect } from 'react';
import { deleteSession, getSessionsByEvent } from '../../services/api'
import Table from 'react-bootstrap/Table';
import { Link, useParams } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';


function SessionTable() {
  const [sessions,setSessions]=useState([]);
  const {eventId}=useParams();

  useEffect(() => {
    getSessionsByEvent(eventId)
    .then((response)=>setSessions(response.data))
    .catch((err)=>console.error(err));
  }, [eventId])

  const handleDelete = (id) => {
      deleteSession(id)
        .then(() => {
          setSessions((prevSessions) => prevSessions.filter((event) => event._id !== id));
        })
        .catch((err) => console.error('Error deleting event:', err));
  };
  
  return (
    <div className="main" style={{padding:"1rem"}} >
      <Breadcrumb>
        <Breadcrumb.Item><Link to="/createSessionPage" style={{ textDecoration: 'none' ,color:"black"}}>Sessions</Link></Breadcrumb.Item>
        <Breadcrumb.Item active>Session Table</Breadcrumb.Item>
      </Breadcrumb>
     <h2>Event Scheduler</h2>
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
        sessions.map((session)=>(
          <>
                <tr>
                  <td key={session._id}>{session.title}</td>
                  <td key={session._id}>{session.startTime}</td>
                  <td key={session._id}>{session.endTime}</td>
                  <td key={session._id}>{session.speaker}</td>
                  <td key={session._id}>
                    <button type="button" className='btn btn-primary me-2'><a href={`/editSession/${session._id}`}>Edit</a></button>
                    <button type="button" onClick={()=>handleDelete(session._id)} className='btn btn-danger '>Delete</button>
                  </td>
                </tr>
              
          </>
        ))
      }
      </tbody>
      </Table>
    </div>
  );
}

export default SessionTable;
