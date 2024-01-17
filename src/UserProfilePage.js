import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserProfilePage = ({ match }) => {
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const params = useParams(); // Using useParams hook to access route parameters

  // Define fetchUser as a separate function
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/user/${params.id}`,
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Use fetchUser in useEffect
  useEffect(() => {
    fetchUser();
  }, [params.id]); // Dependency array includes params.id

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleEditPhoto = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePhoto", selectedFile);

    try {
      await axios.post(`/user/${params.id}/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile photo updated successfully!");
      fetchUser(); // Optionally, fetch user data again to update UI
    } catch (error) {
      console.error("Error updating photo:", error);
      alert("Failed to update photo.");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      <p>Bio: {user.bio}</p>
      {user.profilePhoto && (
        <img
          src={`http://localhost:3000/${user.profilePhoto}`}
          alt={user.username}
        />
      )}
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleEditPhoto}>Upload photo</button>
      </div>
      {/* Add more user details here */}
    </div>
  );
};

export default UserProfilePage;
