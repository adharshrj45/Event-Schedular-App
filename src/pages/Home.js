import React from 'react'
import EventList from '../components/Event/EventList'
import EventForm from '../components/Event/EventForm'

function Home() {
  return (
    <div style={{marginTop:"1rem"}}>
        <EventList/>
        <EventForm/>
    </div>
  )
}

export default Home
