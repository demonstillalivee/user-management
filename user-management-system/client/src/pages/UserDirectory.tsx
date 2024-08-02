import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
}

const UserDirectory: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Directory</h2>
      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{user.name}</h3>
            <p>{user.email}</p>
            <Link
              to={`/users/${user.id}`}
              className="text-blue-500 hover:underline"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDirectory;
