import React, { useState, useEffect } from "react";
// module
// import { useEthers } from "@usedapp/core";
import { BigNumber } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import { connectWallet, getCurrentWalletConnected } from "utils/interact";
// component
import { Row, Col } from "components/Layout";
import { Hidden } from "components/Hidden";
import { Text } from "components/Text";
// styled component
import { HeaderWrapper, ConnectButton } from "./style";

const Header = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchWalletInfo() {
      const { address, status } = await getCurrentWalletConnected();
      setWalletAddress(address);
      setStatus(status);
    }
    fetchWalletInfo();
  }, []);

  useEffect(() => {
    if (status) {
      notify();
      setStatus("");
    }
    // eslint-disable-next-line
  }, [status]);

  const onClickConnectWallet = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWalletAddress(walletResponse.address);
  };

  const onClickDisconnectWallet = async () => {
    setWalletAddress("");
  };

  const notify = () =>
    toast.info(status, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  return (
    <HeaderWrapper>
      <Row
        justifyContent="space-between"
        gap={20}
        padding="15px 20px"
        responsive={{ 380: { gap: -1 } }}
      >
        <Col>
          <Text fColor="white" cursor="pointer" fSize={30}>
            Multi Sender
          </Text>
        </Col>
        <Col>
          <Hidden wHide={[380]}>
            <Row alignItems="center" gap={20}>
              {walletAddress ? (
                <ConnectButton
                  className="mint-btn"
                  onClick={() => onClickDisconnectWallet()}
                >
                  {walletAddress.slice(0, 11)}...
                </ConnectButton>
              ) : (
                <ConnectButton
                  className="mint-btn"
                  onClick={() => onClickConnectWallet()}
                >
                  Connect
                </ConnectButton>
              )}
            </Row>
          </Hidden>
        </Col>
      </Row>
    </HeaderWrapper>
  );
};
export default Header;
