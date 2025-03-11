import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import Home from './Home';
import Certifications from './Certifications';
import Courses from './Courses';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              首頁
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/certifications"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              認證
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/courses"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              課程
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </Router>
  );
}

export default App;
