import React from "react";
import { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../Usercontext";
import { Link } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "./AccountNav";
const ProfilePage = () => {
  const [homepage, sethomepage] = useState(null);
  const { user, ready, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = `profile`;
  }

  async function logout() {
    await axios.post(`https://eventmint-server.onrender.com/v1/ev/logout`);

    sethomepage(`/`);
    setUser(null);
  }

  if (!ready) {
    return `loading...`;
  }

  if (ready && !user && !homepage) {
    return <Navigate to={`/login`} />;
  }

  if (homepage) {
    return <Navigate to={homepage} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === `profile` && (
        <div className="text-center text-white max-w-lg mx-auto">
          logged in as {user.name} ({user.email})<br />
          <button
            onClick={logout}
            className="bg-index w-full py-2 rounded-full mt-2"
          >
            Logout
          </button>
        </div>
      )}
      {subpage === `events` && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
