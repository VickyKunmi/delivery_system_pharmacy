import { FaCartArrowDown, FaCartPlus } from "react-icons/fa";
import styles from "../../styles/user/Header.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { getServer } from "@/config";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Header = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div>
        <Image
          className={styles.image}
          src={"/GP violet.png"}
          alt="logo"
          width={100}
          height={100}
        />
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link className={styles.a} href="/User">
              Home
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link className={styles.a} href="/User/Category">
              Categories
            </Link>
          </li>
          <li className={styles.listItem}><a className={styles.a} href="/User/OrderHistory">Order History</a></li>
          <li className={styles.listItem}><a className={styles.a} href="/User/prescription">Upload Prescription</a></li>
        </ul>
      </div>
        <div className={styles.item}>
          <div className={styles.cart}>
      <Link href="/User/cart">
            <FaCartArrowDown className={styles.icon} />
            {quantity > 0 && <div className={styles.counter}>{quantity}</div>}
      </Link>
          </div>
        </div>
    </div>
  );
};

export default Header;
