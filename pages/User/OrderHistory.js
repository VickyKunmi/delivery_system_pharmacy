import Footer from "@/components/user/userfooter";
import styles from "../../styles/user/OrderHistory.module.css";
import Header from "@/components/user/userheader";
import Image from "next/image";
const OrderHistory = () => {
  return (
    <div className={styles.hcontainer}>
        <Header/>
      <div className={styles.container}>
        <div className={styles.historytable}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.tr}>
                <th>Order ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Date</th>
                <th>Address</th>
                <th>Payment Method</th>
                <th>Remove</th>
              </tr>
              <tr className={styles.tr}>
                <td>
                  <p className={styles.orderIDD}>GP839893</p>
                </td>

                <td>
                  <Image
                    src="/durex.png"
                    width={50}
                    height={50}
                    Fill
                    style={{ objectFit: "cover" }}
                    alt=""
                  />
                </td>

                <td>
                  <div className={styles.name}>Durex Condom</div>
                </td>

                <td>
                <div className={styles.category}>Sexual Safety</div>

                </td>

                <td>
                <div className={styles.price}>3.50 Cedis</div>

                </td>

                <td>
                <div className={styles.quantity}>2</div>

                </td>

                <td>
                <div className={styles.date}>27/02/45 09:00am</div>

                </td>

                <td>
                <div className={styles.address}>Catholic university, Fiapre</div>
                    
                </td>

                <td>
                <div className={styles.pay}>Cash on Delivery</div>
                    
                </td>

                <td>
                  <button className={styles.delete}>Delete</button>
                    </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default OrderHistory;
