import React from "react";
// layout
import { Header, Footer } from "layouts/app-layout/index";
// styled component
import { AppLayoutWrapper } from "./app-layout.style";
// types
import { SideBarItemType } from "types/components/SideBar";
// -----------------------------------------------------------

const Layout = ({ children }) => {
  return (
    <AppLayoutWrapper>
      <Header />
      {children}
      <Footer />
    </AppLayoutWrapper>
  );
};

export default Layout;
