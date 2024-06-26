"use client";
import { useEffect, useState } from "react";
import "./MenuBar.css";

interface openProps {
  open: boolean;
  setopen: any;
  something?: number;
}

const MenuBar = ({ setopen, open }: openProps) => {
  const [change, setChange] = useState(false);

  useEffect(()=>{
    if (open == false) {
      setChange(false);
    }
  },[open])
  return (
    <div onClick={() => setopen(!open)}>
      <div
        onClick={() => setChange(!change)}
        className={`wraper ${change ? "change" : ""}`}
      >
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    </div>
  );
};

export default MenuBar;
