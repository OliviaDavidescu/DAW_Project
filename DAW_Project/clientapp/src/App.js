import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Sidenav from './components/Sidenav';
import HomePage from "./pages/HomePage";
import LoginFormUser from "./components/LoginUser";
import RegistrationFormUser from './components/SignupUser';
import DashboardUser from './pages/DashboardUser';
import RegistrationFormStudent from './components/UserProfile';
import LoginFormAdmin from './components/LoginAdmin';
import RegistrationFormAdmin from './components/SignupAdmin';
import DashboardAdmin from './pages/DashboardAdmin';
import FormCheckOut from './components/AddCheckOut';
import FormBook from './components/AddBook';
import InfoBook from './components/BookInfo';
import InfoStudent from './components/StudentInfo';
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
            <Route path="/users/profile" element={<RegistrationFormStudent />} />

            <Route path="/admins" element={<LoginFormAdmin />} />
            <Route path="/signupadmin" element={<RegistrationFormAdmin />} />
            <Route path="/dashboardadmin" element={<DashboardAdmin />} />
            <Route path="/checouts/create" element={<FormCheckOut />} />
            <Route path="/books/create" element={<FormBook />} />
            <Route path="/books/book/:id" element={<InfoBook />} />
            <Route path="/students/student/:id" element={<InfoStudent />} />
          </Routes>
      </BrowserRouter>
	  </div>
	);
}

export default App;
