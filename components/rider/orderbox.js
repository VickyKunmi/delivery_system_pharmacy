import Link from "next/link";
import styles from "../../styles/rider/Order.module.css";
import Orderstatus from "./orderstatus";

export default function Orderbox({ records }) {
  return (
    <>
      <div className={styles.orderdiv}>
        {records.map(({ id, totalfee }) => (
            <Link href={`/Rider/OrderDetails/${encodeURIComponent(id)}`} key={id}>
          <div className={styles.content}>
              <h3 className={styles.ordertxt}>ORDER ID: {id}</h3>

              <h3 className={styles.orderamt}>
                ORDER AMOUNT: {totalfee} cedis
              </h3>
              <h3 className={styles.orderpay}>
                PAYMENT TYPE: Cash on Delivery
              </h3>

              <h3 className={styles.ordertime}>ORDER TIME: 02/06/23 2:00PM </h3>
            <div className={styles.orderr}>
              <Orderstatus className={styles.orderstat} />
            </div>
          </div>
            </Link>
        ))}
      </div>
    </>
  );
}
