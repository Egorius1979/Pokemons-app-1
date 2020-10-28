import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Header from "./header";
import Sidebar from "./sidebar";
import Cards from "./cards";
import Pagination from "./pagination";

const Main = () => {
  const { isLoggedIn } = useSelector((s) => s.poke);

  if (!isLoggedIn && !localStorage.getItem("poke-token"))
    return <Redirect to="/login" />;

  return (
    <div className="container">
      <Header />
      <div>
        <div className="main-content">
          <Sidebar />
          <Cards />
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default Main;
