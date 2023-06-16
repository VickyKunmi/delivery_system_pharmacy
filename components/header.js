import React from "react";
import styles from "../styles/Home.module.css";
import { FaShoppingCart } from "react-icons/fa";


export default function Header() {
  return (
    <div className={styles.content}>
      <h2>Dashboard</h2>
      <div className={styles.item}>
        <div className={styles.first}>
          <h4 className={styles.number}>Total number</h4>
          <h6 className={styles.num}>2</h6>
          <h6 className={styles.cartpic}>
            <FaShoppingCart className={styles.cart} />
          </h6>
        </div>
        <div className={styles.second}>
          <h4 className={styles.number}>Total number</h4>
          <h6 className={styles.num}>2</h6>
          <h6 className={styles.cartpic}>
            <FaShoppingCart className={styles.cart} />
          </h6>
        </div>
      </div>
    </div>
  );
}
