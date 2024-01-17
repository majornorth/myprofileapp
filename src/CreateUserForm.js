import React, { useState } from "react";
import axios from "axios";

const CreateUserForm = () => {
  const [userData, setUserData] = useState({
    username: "",
    bio: "",
    profilePhoto: null, // Updated to store file data
  });

  const handleChange = (e) => {
    // Handling file input separately
    if (e.target.name === "profilePhoto") {
      setUserData({ ...userData, profilePhoto: e.target.files[0] });
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", userData.username);
    formData.append("bio", userData.bio);
    // Append file data for profilePhoto
    if (userData.profilePhoto) {
      formData.append("profilePhoto", userData.profilePhoto);
    }

    try {
      const response = await axios.post(
        "/create-user",
        formData, // Send formData instead of JSON
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(response.data);
      alert("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user.");
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Bio:</label>
          <textarea name="bio" value={userData.bio} onChange={handleChange} />
        </div>
        <div>
          <label>Profile Photo:</label>
          <input type="file" name="profilePhoto" onChange={handleChange} />
        </div>
        <button type="submit">Create User</button>
      </form>
      <div>
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default CreateUserForm;
