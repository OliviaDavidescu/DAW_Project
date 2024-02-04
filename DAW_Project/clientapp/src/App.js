import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Sidenav from './components/Sidenav';
import HomePage from "./pages/HomePage";
import LoginFormUser from "./components/LoginUser";
import RegistrationFormUser from './components/SignupUser';
import DashboardUser from './pages/DashboardUser';
import LoginFormAdmin from './components/LoginAdmin';
import RegistrationFormAdmin from './components/SignupAdmin';
import AvailableBooks from "./pages/BookList";
import Students from './pages/StudentList';

function App() {
  return (
	  <div className="App">
      <BrowserRouter>
          <Sidenav/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<AvailableBooks />} />
            <Route path="/students" element={<Students />} />

            <Route path="/users" element={<LoginFormUser />} />
            <Route path="/signupuser" element={<RegistrationFormUser />} />
            <Route path="/dashboarduser" element={<DashboardUser />} />

            <Route path="/admins" element={<LoginFormAdmin />} />
            <Route path="/signupadmin" element={<RegistrationFormAdmin />} />
            
          </Routes>
      </BrowserRouter>
	  </div>
	);
}

export default App;
