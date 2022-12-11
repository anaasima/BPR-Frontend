import React from "react";
import logo from "../utils/logo.png";

const AppHeader = ({ onLogoClick, isImageOnly }) => {
  return (
    <React.Fragment>
      <img
        src={logo}
        alt="Logo"
        className="logoImage"
        onClick={() => onLogoClick()}
      />
      {!isImageOnly && <hr style={{ width: "96%", marginLeft: "2%" }} />}
    </React.Fragment>
  );
};

export default AppHeader;
