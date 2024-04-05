import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Footer from "./footer";
const IndexPage = () => {
  // We get the public key of the connected wallet, if there is one
  const { publicKey } = useWallet();
  const [places, setPlaces] = useState([]);
  const [walletAddress, setWalletAddress] = useState("");
  useEffect(() => {
    axios.get("https://eventmint-server.onrender.com/api/v1/ev/place").then((response) => {
      setPlaces(response.data);
    });
  }, []);
  const connectWallet = async () => {
    try {
      const { solana } = window;
      if (solana) {
        const response = await solana.connect();
        console.log(
          "Connected with Public Key:",
          response.publicKey.toString()
        );
        setWalletAddress(response.publicKey.toString());
      }
    } catch (error) {
      if (error.message === "User rejected the request") {
        console.log("User rejected the wallet connection request");
        // Display a user-friendly message or take appropriate action
      } else {
        console.error("Error connecting wallet:", error.message);
        // Handle other errors accordingly
      }
    }
  };

  return (
    <main className="mt-20">
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={"/place/" + place._id} key={place._id}>
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg hover:opacity-75">
                {place.photos?.[0] ? (
                  <Image
                    className="h-full w-full object-cover object-center "
                    src={place.photos[0]}
                    alt=""
                  />
                ) : (
                  <img
                    className="h-full w-full object-cover object-center"
                    src={`https://res.cloudinary.com/dtfvdjvyr/image/upload/v1711530735/eventmintcloud_o63cif.png`}
                    alt="Default Image"
                  />
                )}
              </div>
              <h2 className="font-bold text-white">{place.address}</h2>
              <h3 className="text-md text-index">{place.title}</h3>
              <div className="mt-1">
                <center>
                  <div className="w-full bg-index  rounded-full hover:bg-[#1B1F2E]">
                    <WalletMultiButton className="hover:bg-blue-700" />
                  </div>
                </center>
              </div>
            </Link>
          ))}
      </div>
      <Footer />
    </main>
  );
};

export default IndexPage;
