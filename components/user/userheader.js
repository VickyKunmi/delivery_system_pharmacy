import { FaCartArrowDown, FaCartPlus } from "react-icons/fa";
import styles from "../../styles/user/Header.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";
import { getServer } from "@/config";


const Header = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <div className={styles.container}>
        <div>
        <Image className={styles.image}  src={"/GP violet.png"}  alt="logo" width={100} height={100} />  
        </div>
      <div className={styles.item}>
      
        <ul className={styles.list}>
          
        
    <li className={styles.listItem}><a className={styles.a} href="/User">Home</a></li>
          <li className={styles.listItem}><a className={styles.a} href="/User/Category">Categories</a></li>
          <li className={styles.listItem}>Order History</li>
          <li className={styles.listItem}>Upload Prescription </li>
        </ul>
      </div>
      <Link href="/User/cart" >
      <div className={styles.item}>
        <div className={styles.cart}>
            <FaCartArrowDown className={styles.icon}/>
          <div className={styles.counter}>{quantity}</div>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default Header;
