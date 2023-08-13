import React from 'react';
import { useParams } from 'react-router-dom';

function UserPage() {
  const { username } = useParams();

  // You can fetch user-specific data here based on the username

  return (
    <div>
      <h2>Welcome, {username}!</h2>
      {/* Render user-specific content here */}
    </div>
  );
}

export default UserPage;
