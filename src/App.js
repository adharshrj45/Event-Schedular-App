import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import MainRoute from "./Router/MainRoute";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Toggle sidebar open/close
  };

  return (
    <div className="app">
      <nav>
        <Navbar toggleSidebar={toggleSidebar} />
      </nav>
      <aside className={isSidebarOpen ? "show" : ""}>
        <Sidebar />
      </aside>
      <main>
        <MainRoute />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
