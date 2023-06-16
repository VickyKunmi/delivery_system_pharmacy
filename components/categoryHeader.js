import React from "react";
import styles from "../styles/Home.module.css";

// import {FaShoppingCart} from "react-icons/fa";
export default function Header({child,children}) {
  return (
    <div className={styles.content}>
      <h2>{child}</h2>
      {/* <div className={styles.up}> */}
        {children}
      {/* </div> */}
    </div>
  );
}
