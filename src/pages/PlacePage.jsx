/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import { Disclosure, Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState, useMemo } from "react";
import { UserContext } from "../Usercontext";
import { Navigate, useParams, Link } from "react-router-dom";
import * as web3 from "@solana/web3.js";
import * as buffer from "buffer";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";

import { Keypair, Transaction } from "@solana/web3.js";
import Checkout from "../components/checkout/checkout";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
window.Buffer = buffer.Buffer;
import("@solana/wallet-adapter-react-ui/styles.css");

let receiver;
const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = web3.clusterApiUrl("devnet");
  const wallets = useMemo(() => [], []);
  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState(null);
  const [connected, setconnected] = useState(false);

  const [done, setDone] = useState(false);
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const handleOpenSite = () => {
    const siteUrl = "https://candypay.fun/pay/sbqVKw5ijwCzGaDNBLvgKf";
    window.open(siteUrl, "_blank");
  };
  const handleChange = (event) => {
    setMessage(event.target.value);

    console.log("value is:", event.target.value);
  };

  async function get_bal(connection, publicKey) {
    setBalance(await connection.getBalance(publicKey));
  }

  try {
  } catch (error) {}
  const [redirect, setRedirect] = useState(false);
  const sendSol = (publicKey, sendTransaction, connection) => {
    const transaction = new web3.Transaction();
    const recipientPubKey = "DtjJAembjiCEeH9QmtoiYtDWunFZAsmFVQSZ29CbRadV";
    const sendSolInstruction = web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: recipientPubKey,
      lamports: LAMPORTS_PER_SOL,
    });

    try {
      transaction.add(sendSolInstruction);
      sendTransaction(transaction, connection).then((sig) => {
        console.log(sig);
        alert("Payment Completed");
        setRedirect(true); // Set redirect state to true upon successful payment
        get_bal(connection, publicKey);

        const res = axios.post("http://localhost:4000/api/v1/ev/getNFT", {
          pubkey: publicKey.toString(),
        });
        console.log(res.data);
        if (res.data.status === 200) {
          console.log("Ok to go bro");
        } else console.log(error);
      });
    } catch (error) {
      alert(error);
      console.log(err);
    }
  };

  useEffect(() => {
    if (redirect) {
      // Redirect to success page when redirect state is true
      window.location.href = "/success";
    }
  }, [redirect]);

  const switchPage = () => {};

  const prodContext = useContext(UserContext);
  const [product, setProduct] = useState({
    name: "Default Event Name",
    price: 5.0,
    rating: 3,
    images: [
      {
        id: 1,
        name: "Default Image",
        src: "https://res.cloudinary.com/dtfvdjvyr/image/upload/v1711530735/eventmintcloud_o63cif.png",
        alt: "Default Image Alt Text",
      },
    ],
    colors: [{ name: "Black", bgColor: "bg-black", selectedColor: "" }],
    description: "Default event description.",
    details: [{ name: "Feature", items: ["Feature 1", "Feature 2"] }],
  });
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    axios
      .get(`http://localhost:4000/api/v1/ev/event/${id}`)
      .then((response) => {
        setPlace(response.data);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        setPlace(null);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!place) {
    return null;
  }

  return (
    <>
      <Checkout products={prodContext.prod} open={open} setOpen={setOpen} />
      <div className="">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Tab.Group as="div" className="flex flex-col-reverse">
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {product?.images.map((image) => (
                    <Tab
                      key={image.id}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-index text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only"> {image.name} </span>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <img
                              src={image.src}
                              alt=""
                              className="h-full w-full object-cover object-center"
                            />
                          </span>
                          <span
                            className={classNames(
                              selected ? "ring-index" : "ring-transparent",
                              "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
                {product?.images.map((image) => (
                  <Tab.Panel key={image.id}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover object-center sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                {place.title}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-white">
                  $ {product?.price}
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-3">
                <h3 className="sr-only text-white">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating
                            ? "text-index"
                            : "text-gray-300",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="space-y-6 text-base text-white"
                  dangerouslySetInnerHTML={{ __html: place.description }}
                />
              </div>

              {/* Colors */}
              <h1 className="mb-3 mt-10 text-white">Quantity</h1>
              <select
                defaultValue={1}
                onChange={(e) => {
                  setQuantity(parseInt(e.target.value));
                }}
                className="w-44 h-12 border rounded-lg px-2"
              >
                {[1, 2, 3, 4, 5, 6, 7].map((val, index) => {
                  return <option value={val}>{val}</option>;
                })}
              </select>

              <div className="sm:flex-col1 mt-10 flex">
                <Link
                  onClick={() => {
                    sendSol(publicKey, sendTransaction, connection);
                  }}
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-index py-3 px-8 text-base font-bold text-black hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Purchase ticket
                </Link>
              </div>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only text-white">
                  Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">
                  {product.details.map((detail) => (
                    <Disclosure key={detail.name} as="div">
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                              <span
                                className={classNames(
                                  open ? "text-indigo-600" : "text-white",
                                  "text-sm font-medium"
                                )}
                              >
                                {detail.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel
                            as="div"
                            className="prose prose-sm pb-6"
                          >
                            <ul role="list">
                              {detail.items.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlacePage;
