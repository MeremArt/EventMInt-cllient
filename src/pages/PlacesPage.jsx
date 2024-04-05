import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "./AccountNav";
import axios from "axios";
const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:4000/api/v1/ev/user-event`).then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  const { action } = useParams();

  return (
    <div>
      <AccountNav />

      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-index text-white py-2 px-6 rounded-full "
          to={`/account/events/new`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="w-6 h-6 "
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Add new events
        </Link>
        <div className="mt-4">
          {places.length > 0 &&
            places.map((place) => (
              <Link
                to={"/account/events/" + place._id}
                className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl"
              >
                <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                  <img
                    className=""
                    src={
                      "https://res.cloudinary.com/dtfvdjvyr/image/upload/v1711530735/eventmintcloud_o63cif.png"
                    }
                  />
                </div>
                <div className="grow-0 shrink ">
                  <h2 className="text-2xl font-semibold text-left">
                    {place.title}
                  </h2>
                  <p className="text-sm mt-2 text-left">{place.description}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PlacesPage;
