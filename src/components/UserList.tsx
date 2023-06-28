import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the user list from the Nest.js backend API
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
          throw new Error('Failed to fetch user list');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error: any) {
        console.error('Error:', error.message);
        // Handle the error, display an error message, or perform any other error-related actions
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
