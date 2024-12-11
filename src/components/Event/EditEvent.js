import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { fetchEventsById, updateEvent } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate(); // Get the event ID from the URL
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  // Fetch event details by ID and set default form data
  useEffect(() => {
    fetchEventsById(id)
      .then((response) => {
        const event = response.data;
        setFormData({
          title: event.title || "",
          description: event.description || "",
          date: event.date ? event.date.split("T")[0] : "", 
          location: event.location || "",
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("Form Submitted:", formData);
    updateEvent(id, formData) 
      .then(() => {
        alert("Event updated successfully!");
        setFormData({title: '',description: '',date: '',location: '',});
        navigate("/viewevents");
    })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Edit Event</h2>
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
    </div>
  );
}

export default EditEvent;
