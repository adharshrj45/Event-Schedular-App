// eslint-disable-next-line react/prop-types
import './Navbar.css'
function Navbar({ toggleSidebar }) {
    return (
    
      <div className="navbar">
        <h4>Event Schedular</h4>
        {/* Add button to toggle the sidebar */}
        <button className='toggle-button' onClick={toggleSidebar}>Menu</button>
      </div>
    );
  }
  
  export default Navbar;
  