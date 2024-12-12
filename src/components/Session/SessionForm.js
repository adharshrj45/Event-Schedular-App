import React, { useState } from 'react';
import { createSession } from '../../services/api';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert'; 
import Breadcrumb from 'react-bootstrap/Breadcrumb';


const SessionForm = () => {
  const { eventId } = useParams();//fetch id from url
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    startTime: '',
    endTime: '',
    speaker: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSession(eventId, formData);
      setFormData({ title: '', startTime: '', endTime: '', speaker: '' });
      // navigate('/createSessionPage'); // Navigate to session page after creation
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message); // Set error message from backend
        console.error('Error creating session:', error.response.data);
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    }
  };

  return (
    <Container style={{ padding: '1rem' }}>
      <Breadcrumb>
        <Breadcrumb.Item><Link to="/createSessionPage" style={{ textDecoration: 'none' ,color:"black"}}>Sessions</Link></Breadcrumb.Item>
        <Breadcrumb.Item active>Create Session</Breadcrumb.Item>
      </Breadcrumb>
      { errorMessage &&  //if error message is present
        (<Alert variant={'warning'}>
          {errorMessage}
        </Alert>)
      }

      <h2 className="mb-4">Create Session</h2>
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
          Add Session
        </Button>
      </Form>
    </Container>
  );
};

export default SessionForm;
