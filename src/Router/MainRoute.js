import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ViewEvent from '../components/Event/ViewEvent'
import Home from '../pages/Home'
import ViewEvents from '../pages/ViewEvents'
import EditEvent from '../components/Event/EditEvent'
import CreateSessionPage from '../pages/CreateSessionPage'
import SessionForm from '../components/Session/SessionForm'
import SessionTable from '../components/Session/SessionTable'
import ViewSession from '../components/Session/ViewSession'
import EditSession from '../components/Session/EditSession'

function MainRoute() {
  return (
    <>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/viewEvent/:id' element={<ViewEvent/>}/>
            <Route path='/viewEvents' element={<ViewEvents/>}/>
            <Route path='/editEvent/:id' element={<EditEvent/>}/>
            <Route path='/createSessionPage' element={<CreateSessionPage/>}/>
            <Route path='/createSession/:eventId' element={<SessionForm/>}/>
            <Route path='/manageSession/:eventId' element={<SessionTable/>}/> 
             <Route path='/editSession/:sessionId' element={<EditSession/>}/>
            <Route path="/viewSession/:eventId" element={<ViewSession/>} />
        </Routes>
    </>
  )
}

export default MainRoute