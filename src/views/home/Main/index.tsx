import React, { useState } from "react";
import Web3 from "web3";
import {
  MainWrapper,
  InputToolContainer,
  AddressInput,
  AddButton,
  SaveButton,
  TokenAddressInput,
} from "./style";
import { AddressList } from "./components";
// import { DropDown } from "./components";
import mutisenderAbi from "abis/mutisenderAbi.json";
import ERC20ABI from "abis/ERC20ABI.json";

import { BigNumber } from "ethers";
// ----------------------------------------------------------

export default function index() {
  if (!window?.ethereum) return <></>;
  const web3 = new Web3(window.ethereum);
  const walletAddress = window.ethereum.selectedAddress;

  const contractAddress = "0x3d9eCf0F8AB872a95d825d4923df86784BaBBe50";
  const MultiSenderContract = new web3.eth.Contract(
    mutisenderAbi as any,
    contractAddress
  );

  const [currentValue, setCurrentValue] = useState<string>("");
  const [currentTokenAddress, setCurrentTokenAddress] = useState<string>("");
  const [fullList, setFullList] = useState<string[]>([]);
  const [addressList, setAddressList] = useState<string[]>([]);
  const [amountList, setAmountList] = useState<BigNumber[]>([]);
  const [removedKey, setRemovedKey] = useState<number>(-1);

  const handleMutisender = async () => {
    const reg = /0x[a-fA-F0-9]{40}/;
    const result = reg.test(currentTokenAddress);
    if (result && addressList && amountList) {
      const TokenContract = new web3.eth.Contract(
        ERC20ABI as any,
        currentTokenAddress
      );
      // console.log("token", TokenContract);
      const tokenBalance = await TokenContract.methods
        .balanceOf(walletAddress)
        .call();
      console.log(tokenBalance);
      let temp: BigNumber = BigNumber.from(0);
      for (let i = 0; i < amountList.length; i++) {
        temp = temp.add(amountList[i]);
      }
      const tokenBalanceBN = BigNumber.from(tokenBalance);
      if (temp.lte(tokenBalanceBN)) {
        // const allowanceAmount: BigNumber = tokenBalanceBN.sub(temp);
        const allowance = await TokenContract.methods
          .allowance(walletAddress, contractAddress)
          .call();
        console.log("wonder", allowance);
        if (allowance == 0) {
          await TokenContract.methods
            .approve(
              contractAddress,
              BigNumber.from(
                "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
              )
            )
            .send({
              from: walletAddress,
            });
        }
        console.log("OK", allowance);
        // console.log(addressList, amountList);

        await MultiSenderContract.methods
          .MultisendToken(currentTokenAddress, addressList, amountList)
          .send({
            from: walletAddress,
          });
      } else {
        alert("Total exceed the balance of token");
      }
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
      // console.log(amountList);
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
