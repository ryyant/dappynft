import React, { useState, useEffect, Component } from "react";
import { ethers } from "ethers";
import { Button, Popover, PopoverTrigger, Portal, PopoverContent, PopoverArrow, PopoverHeader, PopoverCloseButton, PopoverBody, PopoverFooter } from "@chakra-ui/react";

const ConnectWallet = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [provider, setProvider] = useState(null);

  const connectWalletHandler = () => {
    if (window.ethereum && defaultAccount == null) {
      // set ethers provider
      setProvider(new ethers.providers.Web3Provider(window.ethereum));

      // connect to metamask
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          setConnButtonText("Wallet Connected");
          setDefaultAccount(result[0]);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else if (!window.ethereum) {
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  useEffect(() => {
    if (defaultAccount) {
      provider.getBalance(defaultAccount).then((balanceResult) => {
        setUserBalance(ethers.utils.formatEther(balanceResult));
      });
    }
  }, [defaultAccount]);

  return (
    <Popover>
    <PopoverTrigger>
        <Button colorScheme='blackAlpha' m={4}>{connButtonText}</Button>
    </PopoverTrigger>
    <Portal>
        <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>Address: {defaultAccount} <br/>Balance: {userBalance}</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
            <Button colorScheme='orange' onClick={connectWalletHandler}>{connButtonText}</Button>
        </PopoverBody>
        <PopoverFooter>{errorMessage}</PopoverFooter>
        </PopoverContent>
    </Portal>
    </Popover>
  );
};

export default ConnectWallet;