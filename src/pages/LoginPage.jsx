import React, { useContext, useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Usercontext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    // Reload upon successful login
    if (redirect) {
      window.location.reload();
    }
  }, [redirect]);

  const loginUser = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.post(
        "https://eventmint-server.onrender.com/api/v1/ev/login",
        { email, password }
      );

      if (response.status === 200) {
        const { token } = response.data;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", token);
        setUser({ token });
        setRedirect(true);
        alert(`Welcome Back!`);
        toast.success("Welcome Back!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        setLoginFailed(true);
      }
    } catch (error) {
      setLoginFailed(true);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <main className="mt-4 grow flex items-center justify-around">
        <div className="mb-32">
          <h1 className="text-4xl text-center mb-4 text-white">Login</h1>
          <form className="max-w-md mx-auto " onSubmit={loginUser}>
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
            <button className="primary">Login</button>
            <div className="text-center py-2 text-white">
              Don't have an account yet?{" "}
              <Link className="underline text-index" to={`/register`}>
                Register
              </Link>
            </div>
            {loginFailed && (
              <center>
                <p className="text-red-500">
                  Login failed. Please check your credentials.
                </p>
              </center>
            )}
          </form>
        </div>
      </main>
      {/* Toast Container placed outside the form for better rendering */}
      <ToastContainer />
    </>
  );
};

export default LoginPage;
