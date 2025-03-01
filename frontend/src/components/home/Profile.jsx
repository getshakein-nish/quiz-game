import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [username, setUsername] = useState("Username"); // Replace with actual username logic
  const [email, setEmail] = useState("user@example.com"); // Replace with actual email logic
  const [wins, setWins] = useState(10); // Replace with actual wins logic
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = () => {
    setUsername(newUsername);
    setIsEditingUsername(false);
  };

  const handlePasswordChange = () => {
    setIsChangingPassword(true);
  };

  const handleSaveNewPassword = () => {
    if (newPassword === confirmNewPassword) {
      // Add logic to save the new password
      alert("Password changed successfully!");
      setIsChangingPassword(false);
      setNewPassword("");
      setConfirmNewPassword("");
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 relative">
      <button
        className="absolute top-4 left-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
        onClick={() => navigate('/homepage')}
      >
        Back
      </button>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          {isEditingUsername ? (
            <div className="flex items-center">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ml-2"
                onClick={handleUsernameChange}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span>{username}</span>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={() => setIsEditingUsername(true)}
              >
                Change
              </button>
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <span>{email}</span>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Wins</label>
          <span>{wins}</span>
        </div>
        {isChangingPassword ? (
          <div className="mt-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Confirm New Password</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 mt-4 w-full"
              onClick={handleSaveNewPassword}
            >
              Save New Password
            </button>
          </div>
        ) : (
          <button
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-700 mt-4 w-full"
            onClick={handlePasswordChange}
          >
            Change Password
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;