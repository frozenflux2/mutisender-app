import { ethers } from "ethers";
// import { chainId } from "constants/address";

export const connectWallet = async () => {
  if (window.ethereum) {
    console.log(window.ethereum);
    try {
      const chain = await window.ethereum.request({ method: "eth_chainId" });

      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "",
        };
      } else {
        return {
          address: "",
          status: "Connect your wallet account to the site.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: err.message,
      };
    }
  } else {
    return {
      address: "",
      status:
        "You must install Metamask, a virtual Ethereum wallet, in your browser.",
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      const chain = await window.ethereum.request({
        method: "eth_chainId",
      });
      if (addressArray.length > 0 && chain === chainId) {
        return {
          address: addressArray[0],
          status: "",
        };
      } else {
        return {
          address: "",
          status:
            "Connect to Metamask and choose the correct chain using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: err.message,
      };
    }
  } else {
    return {
      address: "",
      status:
        "You must install Metamask, a virtual Ethereum wallet, in your browser.",
    };
  }
};
