import axios from 'axios';
const API = axios.create({ baseURL : "https://event-schedular-server.vercel.app/"});


//events
export const fetchEvents = () => API.get('/events');
export const fetchEventsById = (id) => API.get(`/events/${id}`);
export const createEvent = (newEvent) => API.post('/events',newEvent);
export const updateEvent =(id,updatedEvent)=>API.put(`/events/${id}`,updatedEvent)
export const deleteEvent = (id) => API.delete(`/events/${id}`);

//sessions
export const createSession = (eventId, newSession) =>API.post(`/sessions/${eventId}`, newSession);
export const updateSession = (sessionId, updatedSession) =>API.put(`/sessions/${sessionId}`, updatedSession);
export const deleteSession = (sessionId) => API.delete(`/sessions/${sessionId}`);
export const getSessionsByEvent = (eventId) =>API.get(`/sessions/${eventId}`);
export const getSessionById = (sessionId) =>API.get(`/sessions/edit/${sessionId}`);
  
