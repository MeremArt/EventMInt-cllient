import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const RegisterPage = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const registerUser = (ev) => {
    ev.preventDefault();

    try {
      axios.post(" http://localhost:4000/api/v1/ev/register", {
        name,
        email,
        password,
      });
      alert("Registration successful");
    } catch (error) {
      alert("Registration failed. please try again later");
    }
  };
  return (
    <>
      <main className="mt-4 grow flex items-center justify-around text-black">
        <div className="mb-32">
          <h1 className="text-4xl text-center mb-4 text-white">Register</h1>
          <form className="max-w-md mx-auto " onSubmit={registerUser}>
            <input
              type="text"
              placeholder="Merem"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <button className="primary">Register</button>
            <div className="text-center py-2 text-white">
              Already a member?{" "}
              <Link className="underline text-index" to={`/login`}>
                Login
              </Link>
            </div>
          </form>
        </div>
      </main>
      {/* remember mb-64 */}
    </>
  );
};

export default RegisterPage;
