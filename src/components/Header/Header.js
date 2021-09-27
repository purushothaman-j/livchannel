import React from "react";
import "./Header.css";
import { useStateValue } from "../../StateProvider";

function Header() {
  const [{ user }] = useStateValue();

  return (
    <div className="header">
      <div className="header__main">
        <h1>Livchannel</h1>
      </div>
    </div>
  );
}

export default Header;
