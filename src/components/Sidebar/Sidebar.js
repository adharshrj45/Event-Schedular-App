import { Link } from 'react-router-dom'
import './Sidebar.css'
const Sidebar = () => {
    return (
      <div className='sidebar'>
        <ul>
          <li><Link className='sidebar-btn' to="/">Create Event</Link></li>
          <li><Link className='sidebar-btn' to="/viewEvents">View Events</Link></li>
          <li><Link className='sidebar-btn' to="/createSessionPage">Create Session</Link></li>
        </ul>
      </div>
    )
  }
  
  export default Sidebar
  