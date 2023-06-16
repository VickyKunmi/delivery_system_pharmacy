import { FaBook, FaHome, FaQuestion, FaSignOutAlt } from "react-icons/fa";
import styles from "../../styles/rider/NavSidebar.module.css";

export default function Navsidebar() {
  return (
    <div className={styles.body}>
      {/* <label className={styles.hamburger-menu}>
        <input type="checkbox"></input>
      </label>
      <aside className={styles.sidebar}>
        <nav>
          <div>Order</div>
          <div>Help</div>
          <div>Logout</div>

          
        </nav>
      </aside> */}

      <nav role="navigation">
        <div className="menuToggle">
          <input type="checkbox" className={styles.input} />
          <span className={styles.span} ></span>
          <span className={styles.span}></span>
          <span className={styles.span}></span>

          <ul className={styles.menu}>
            <li className={styles.li}>
              {/* {" "} */}
              <a href="/Rider" className={styles.a}><FaHome className={styles.icon} />Home</a>
            </li>
            <li className={styles.li}><a href="/Rider/orderHistory" className={styles.a}><FaBook className={styles.icon}/>Orders</a></li>
            <li className={styles.li}><a href="#" className={styles.a}><FaQuestion className={styles.icon}/>Help</a></li>
            <li className={styles.log}><a href="/Rider/Login" className={styles.a}> <FaSignOutAlt className={styles.icon}/>Logout</a></li>
          
          </ul>
        </div>
      </nav>
    </div>
  );
}
