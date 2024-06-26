import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import "./App.css";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
export default function Layout() {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // State to track whether the buttons are active or inactive
  const [areButtonsActive, setAreButtonsActive] = useState(true);

  // Handler to toggle button activity
  const toggleButtonActivity = () => {
    setAreButtonsActive(!areButtonsActive);
  };

  // You can also provide a custom RPC endpoint.
  const endpoint = clusterApiUrl(network);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter({ network }),
  ];

  return (
    <div
      className={`flex flex-col min-h-screen p-4 max-h-full ${
        areButtonsActive ? "buttons-active" : "buttons-inactive"
      }`}
    >
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <Navbar />
            <div className="mt-4">
              <center>
                <div className="w-96  btn-77  bg-index  rounded-full hover:bg-[#1B1F2E]">
                  <WalletMultiButton className="hover:bg-blue-700" />
                </div>
              </center>
            </div>
            <Outlet />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}
