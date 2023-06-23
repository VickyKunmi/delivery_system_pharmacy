import React from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import {
  FaCartPlus,
  FaLayerGroup,
  FaMotorcycle,
  FaPills,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={"/../public/logo.png"}
        alt="logo"
        width={100}
        height={100}
      />
      <div className={styles.list}>
        <ul>
          <li>
            <FaTachometerAlt className={styles.icon} />
            <a href="/">Dashboard</a>
          </li>
          <li>
            <FaLayerGroup className={styles.icon} />
            <a href="/category">Category</a>
          </li>
          <li>
            <FaPills className={styles.icon} />
            <a href="/drug">Drug</a>
          </li>
          <li>
            <FaPills className={styles.icon} />
            <a href="/featuredDrug">Featured Drug</a>
          </li>
          <li>
            <FaMotorcycle className={styles.icon} />
            <a href="/riders">Riders</a>
          </li>
          <li>
            <FaUsers className={styles.icon} />
            <a href="/users">Users</a>
          </li>
          <li>
            <FaCartPlus className={styles.icon} />
            <a href="/orders">Orders</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
