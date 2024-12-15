// client/src/components/Users.js
import React, { useEffect, useState } from 'react';
import api from '../services/api.js'; // Import the API service

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div>
      <h1>User Management</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;