import React, { useState } from "react";
import axios from "axios";
import './Home.css';
import FormContainer from "../components/FormContainer";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/auth/register`, {
        username,
        email,
        password,
      });
      setMessage("Registration successful!");
    } catch (error) {
      console.error("Registration failed:", error.response.data.error);
      setMessage("Registration failed: " + error.response.data.error);
    }
  };

  return (
    <div>
      <FormContainer className="d-flex justify-content-center ">
        <h2 className="form-title">Register</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="input-field"
            required
          />
          <br />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input-field"
            required
          />
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-field"
            required
          />
          <br />
          <button type="submit" className="btn button btn-success w-100 rounded-0">Register</button>
        </form>
        {message && <p>{message}</p>}
      </FormContainer>
    </div>
  );
};

export default Registration;
