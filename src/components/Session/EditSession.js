import React, { useEffect, useState } from 'react';
import { getSessionById, updateSession } from '../../services/api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import  Alert  from 'react-bootstrap/Alert';
import Breadcrumb from 'react-bootstrap/Breadcrumb';


const EditSession = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    startTime: '',
    endTime: '',
    speaker: '',
  });
  const [error, setError] = useState(''); // Add error state

  useEffect(() => {
    getSessionById(sessionId)
      .then((response) => {
        const session = response.data;
        console.log(session);
        setFormData({
          title: session.title || '',
          startTime: session.startTime || '',
          endTime: session.endTime || '',
          speaker: session.speaker || '',
        });
      })
      .catch((err) => {
        console.error('Error fetching session:', err);
        setError('Failed to fetch session data.');
      });
  }, [sessionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSession(sessionId, formData);
      navigate('/createSessionPage'); // Navigate to the session management page after saving changes
    } catch (error) {
      if(error.response && error.response.data) {
        setError(error.response.data.message); // Set error message from backend
      } else {
        console.error('Error updating session:', error);
    }
  };
}
  
  return (
    <Container style={{ padding: '1rem' }}>
      <Breadcrumb>
        <Breadcrumb.Item><Link to="/createSessionPage" style={{ textDecoration: 'none' ,color:"black"}}>Sessions</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/manageSession" style={{ textDecoration: 'none' ,color:"black"}}>Session Table</Link></Breadcrumb.Item>
        <Breadcrumb.Item active>Edit Session</Breadcrumb.Item>
      </Breadcrumb>
      { error &&  //if error message is present
        (<Alert variant={'warning'}>
          {error}
        </Alert>)
      }
      <h2 className="mb-4">Edit Session</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Session Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter session title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>End Time</Form.Label>
          <Form.Control
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Speaker</Form.Label>
          <Form.Control
            type="text"
            name="speaker"
            placeholder="Enter speaker's name"
            value={formData.speaker}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default EditSession;
