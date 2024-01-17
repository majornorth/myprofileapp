import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error("Received data is not an array:", response.data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const getImageUrl = (profilePhoto) => {
    if (profilePhoto) {
      return `http://localhost:3000/${profilePhoto}`;
    }
    // Return the URL to the default avatar image
    return "/default-avatar.png"; // This path assumes that the image is in the public directory
  };

  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>Profile Photo</th>
            <th>Username</th>
            <th>Bio</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <img src={getImageUrl(user.profilePhoto)} alt={user.username} />
              </td>
              <td>
                <Link to={`/user/${user._id}`}>{user.username}</Link>{" "}
                {/* Link to user profile */}
              </td>
              <td>{user.bio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
