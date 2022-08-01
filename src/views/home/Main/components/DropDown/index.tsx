import React from "react";
import Select from "react-select";
import { DropDownWrapper } from "./style";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import ethers from "ethers";
// import Moralis from "@Moralis";

const aquaticCreatures = [
  { label: "BNB", value: "BNB" },
  { label: "ERC20-Token", value: "ERC20-Token" },
  // { label: "Whale", value: "Whale" },
  // { label: "Octopus", value: "Octopus" },
  // { label: "Crab", value: "Crab" },
  // { label: "Lobster", value: "Lobster" },
];
function index() {
  // const loadtokenmetaData= async()=>{
  const walletaddress = window.ethereum.selectedAddress;
  (async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://sample-endpoint-name.network.quiknode.pro/token-goes-here/"
    );
    provider.connection.headers = { "x-qn-api-version": 1 };
    const heads = await provider.send("qn_getWalletTokenBalance", {
      wallet: walletaddress,
    });
    console.log(heads);
    // const balances = await Moralis.Web3.getAllERC20();
  })();
  //   (async () => {
  //     const provider = new ethers.providers.JsonRpcProvider("http://sample-endpoint-name.network.quiknode.pro/token-goes-here/");
  //     provider.connection.headers = { "x-qn-api-version": 1 };
  //     const heads = await provider.send("qn_getWalletTokenBalance", {
  //       wallet: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  //     });
  //     console.log(heads);
  //   })();
  // }
  return (
    <DropDownWrapper>
      <Select
        options={aquaticCreatures}
        onChange={(opt) => {
          // console.log(opt.label, opt.value);
        }}
        className="search"
      />
    </DropDownWrapper>
  );
}

export default index;
