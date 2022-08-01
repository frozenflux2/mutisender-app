// next
import React from "react";
import type { NextPage } from "next";
// component
import { Page } from "components/Page";

// views
import { MainView } from "views/home";

// ------------------------------------------------------
const Home: NextPage = () => {
  return (
    <Page name="home">
      <MainView />
    </Page>
  );
};

export default Home;
