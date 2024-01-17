import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreateUserPage from "./CreateUserPage";
import HomePage from "./HomePage"; // Import a component for the home page
import UserProfilePage from "./UserProfilePage";

function App() {
  return (
    <Router>
      <div>
        <nav>
          {/* Link to the home page */}
          <Link to="/">Home</Link>
          {/* Link to the create-user route */}
          <Link to="/create-user">Create User</Link>
        </nav>

        {/* Routes component to define route mappings */}
        <Routes>
          {/* Route for the root URL */}
          <Route path="/" element={<HomePage />} />

          {/* Route for /create-user */}
          <Route path="/create-user" element={<CreateUserPage />} />

          {/* Route for a specific user's profile */}
          <Route path="/user/:id" element={<UserProfilePage />} />

          {/* You can add more routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
