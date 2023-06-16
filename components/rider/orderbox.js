import styles from "../../styles/rider/Order.module.css";

export default function Orderbox() {
  return (
    <>
      <div className={styles.orderdiv}>
      
        <div className={styles.content}>

            <h3 className={styles.ordertxt}>ORDER ID: Gp0023</h3>

            <h3 className={styles.orderamt}>ORDER AMOUNT: 30.56 cedis</h3>
            <h3 className={styles.orderpay}>PAYMENT TYPE: Cash on Delivery</h3>

            <h3 className={styles.ordertime}>ORDER TIME: 02/06/23 2:00PM </h3>
    
        </div>
      
      </div>
     
    </>
  );
}
