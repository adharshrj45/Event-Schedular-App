import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createEvent, fetchEvents } from '../../services/api';
import Container from 'react-bootstrap/esm/Container';

function EventForm({setFetch}) {
  // Step 1: Initialize state for form inputs
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
  });

  // Step 2: Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Step 3: Handle form submission
  const handleSubmit = (e) => { 
    e.preventDefault()
    console.log('Form Submitted:', formData);
    createEvent(formData);
    setFormData({
      title: '',
      description: '',
      date: '',
      location: '',
    });
    setFetch(true);
  };

  return (
    <Container style={{ padding: '1rem' }}>
      <h2 className="mb-4">Create Event</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter event title"
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            placeholder="Enter the Description of the event"
            rows={3}
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            placeholder="Enter the date of the event"
            value={formData.date}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            placeholder="Enter the location of the event"
            value={formData.location}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default EventForm;
