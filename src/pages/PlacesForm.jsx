import React, { useState, useEffect } from "react";
import PhotosUploader from "./PhotosUploader";
import Perks from "./Perks";
import AccountNav from "./AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
const PlacesForm = () => {
  const { id } = useParams();
  console.log({ id });
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [title, setTitle] = useState();

  const [address, setAddress] = useState();

  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [redirectPlace, setRedirectPlace] = useState("");
  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get("https://eventmint-server.onrender.com/api/v1/ev/event/" + id)
      .then((response) => {
        const { data } = response;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        //  setPrice(data.price);
      });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-white text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-mid text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  const addNewPlace = async (ev) => {
    ev.preventDefault();
    const placeData = {
      title,
      description,
      perks,
      address,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };

    // Log the placeData before making the request
    console.log("Posting placeData:", placeData);

    if (id) {
      //update
      await axios.put(`http://localhost:4000/api/v1/ev/update-place`, {
        id,
        ...placeData,
      });
      console.log("Posting placeData:", placeData);
      setRedirectPlace(true);
      alert("id present");
      console.log(id);
    } else {
      //new place
      await axios.post(`http://localhost:4000/api/v1/ev/upload-place`, {
        title,
        description,
        perks,
        address,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });
      setRedirectPlace(true);
      alert("id not present");
    }
  };

  if (redirectPlace) {
    return <Navigate to={`/account/events`} />;
  }
  return (
    <>
      <AccountNav />
      <form onSubmit={addNewPlace}>
        {preInput(`Event Name`, `make it short and catchy 😉`)}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Enter event title"
        />
        {preInput(`Address`, `address to event 📍`)}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="Enter event address"
        />
        {preInput(`Photos`, `more=better`)}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput(`Description`, `Event details 📝`)}
        <br />
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          className="text-white"
        />
        {preInput(`Perks`, `select perks of event`)}
        <br />
        <Perks selected={perks} onChange={setPerks} />
        {preInput(`Extra info`, `rules,etc`)}
        <br />
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
          className="text-white"
        />
        {preInput(
          `Check in&out time, max guests`,
          `add event start and end time`
        )}
        <br />
        <div className="grid gap-1 ">
          <div>
            <h3 className="text-white">Event start time</h3>
            <input
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              type="number"
              placeholder="14:00"
            />
          </div>
          <div>
            <h3 className="text-white">Event end time</h3>
            <input
              type="number"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="20:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 text-white">Max number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
              placeholder="Max Number"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 text-white">Price per ticket</h3>
            <input type="number" value={""} />
          </div>
          <button className="index w-full rounded-full py-2 mt-4">Save</button>
        </div>
      </form>
    </>
  );
};

export default PlacesForm;
