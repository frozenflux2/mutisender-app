import React, { useState } from "react";
import Web3 from "web3";
// styled components
import {
  MainWrapper,
  InputToolContainer,
  AddressInput,
  AddButton,
  SaveButton,
  TokenAddressInput,
} from "./style";
import { AddressList } from "./components";
import { DropDown } from "./components";
import { REGISTER } from "redux-persist/lib/constants";
import mutisenderAbi from "abis/mutisenderAbi.json";
import ERC20ABI from "abis/ERC20ABI.json";

import { BigNumber } from "ethers";
import { produceWithPatches } from "immer";
// ----------------------------------------------------------

export default function index() {
  const web3 = new Web3(window.ethereum);
  const walletAddress = window.ethereum.selectedAddress;

  // const MultiSenderContract = new web3.eth.Contract(
  //   mutisenderAbi as any,
  //   "0x2ffb889B57b9335D4e804Dd19c93a01a70ae9B0b"
  // );
  // const owner = "0x1F713e607fa0FCC5Bad4A3f0Fd24Ab0fD8Fb3BF4";
  const tokenAddress = "0xf5A89a2F90f79fC09AF021b09fB218C682113574";
  const MultiSenderContract = new web3.eth.Contract(
    mutisenderAbi as any,
    "0x3d9eCf0F8AB872a95d825d4923df86784BaBBe50"
  );
  // const account = web3.eth.getAccounts;
  // console.log(account[0]);
  console.log(MultiSenderContract);
  const [currentValue, setCurrentValue] = useState<string>("");
  const [currentTokenAddress, setCurrentTokenAddress] = useState<string>("");
  const [fullList, setFullList] = useState<string[]>([]);
  const [addressList, setAddressList] = useState<string[]>([]);
  const [amountList, setAmountList] = useState<BigNumber[]>([]);
  const [removedKey, setRemovedKey] = useState<number>(-1);
  const handleMutisender = () => {
    const reg = /0x[a-fA-F0-9]{40}/;
    const result = reg.test(currentTokenAddress);
    if (result && addressList && amountList) {
      const TokenContract = new web3.eth.Contract(
        ERC20ABI as any,
        currentTokenAddress
      );
      const allowance = TokenContract.methods.allowance(
        walletAddress,
        tokenAddress
      );
      if (!allowance) {
        TokenContract.methods.approve(
          tokenAddress,
          BigNumber.from(
            "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
          )
        );
      }
      // window.addEventListener("load", async () => {
      //   try {
      //     await window.ethereum.enable();
      //   } catch (error) {
      //     console.log(error);
      //   }
      // });
      console.log(addressList, amountList);
      // if (value == 0) {
      //   MultiSenderContract.methods.MultisendToken(
      //     TokenContract,
      //     addressList,
      //     amountList
      //   );
      // } else {
      // let value = new BigNumber(0x03).pow(17)

      MultiSenderContract.methods
        .MultisendToken(tokenAddress, addressList, amountList)
        .send({
          from: "0x1F713e607fa0FCC5Bad4A3f0Fd24Ab0fD8Fb3BF4",
          // value: value,
        });
      // MultiSenderContract.methods.MultisendBNB(addressList, amountList).send({
      //   from: "0x1F713e607fa0FCC5Bad4A3f0Fd24Ab0fD8Fb3BF4",
      //   value: BigNumber.from(10000000),
      // });
      // }
    }
  };

  const handleAddressInput = (e) => {
    e.preventDefault();
    setCurrentValue(e.target.value);
  };

  const handleRemove = (selectedAddress) => {
    const restult = [...fullList].filter((item) => item !== selectedAddress);

    setAddressList(
      [...addressList].filter((item, key) => {
        if (item !== selectedAddress.split(",")[0]) {
          setRemovedKey(key);
          return item;
        }
      })
    );
    setAmountList([...amountList].filter((item, key) => key !== removedKey));
    setFullList(restult);
  };

  const handleClick = () => {
    const reg = /0x[a-fA-F0-9]{40}/;
    const result = reg.test(currentValue);
    if (result) {
      setFullList([...fullList, currentValue]);
      setCurrentValue("");
      setAddressList([...addressList, currentValue.split(",")[0]]);
      setAmountList([
        ...amountList,
        BigNumber.from(currentValue.split(",")[1]),
      ]);
      console.log(amountList);
    }
  };

  const handleTokenAddressInput = (e) => {
    e.preventDefault();
    setCurrentTokenAddress(e.target.value);
  };

  return (
    <MainWrapper>
      <InputToolContainer>
        {/* <DropDown /> */}
        <TokenAddressInput
          placeholder="Please Input Token Address"
          value={currentTokenAddress}
          onChange={handleTokenAddressInput}
        />
        <AddressInput
          placeholder="0x77B8......2D8e3b, 10000000000000000000"
          value={currentValue}
          onChange={handleAddressInput}
        ></AddressInput>
        <AddButton onClick={handleClick}>Add</AddButton>
      </InputToolContainer>
      <AddressList data={fullList} handleRemove={handleRemove}></AddressList>
      <InputToolContainer>
        <SaveButton onClick={handleMutisender}>MutiSend</SaveButton>
      </InputToolContainer>
    </MainWrapper>
  );
}
function contract_abi(contract_abi: any, contract_address: any) {
  throw new Error("Function not implemented.");
}

function contract_address(
  contract_abi: (contract_abi: any, contract_address: any) => void,
  contract_address: any
) {
  throw new Error("Function not implemented.");
}
