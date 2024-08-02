// src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Home: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to User Management System
      </h1>
      <p className="mb-8">
        A simple and effective way to manage user profiles and connect with
        others.
      </p>

      {user ? (
        <div>
          <p className="mb-4">Welcome back, {user.name}!</p>
          <Link
            to="/profile"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4"
          >
            View Profile
          </Link>
          <Link
            to="/users"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            User Directory
          </Link>
        </div>
      ) : (
        <div>
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
