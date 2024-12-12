import React, { useState } from 'react'
import EventList from '../components/Event/EventList'
import EventForm from '../components/Event/EventForm'

function Home() {

  const [fetch,setFetch] = useState(false);
  return (
    <div style={{marginTop:"1rem"}}>
        <EventList fetch={fetch}/>
        <EventForm setFetch={setFetch}/>
    </div>
  )
}

export default Home
