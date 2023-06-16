import styles from "../../styles/rider/OrderDetails.module.css";
import Navsidebar from '@/components/rider/Navsidebarr';
export default function Orderdetails(){
    return(

       
    <div className={styles.body}>
       
       <Navsidebar/>
        <div className={styles.customerslip}>
            <h2 className={styles.header}>Customer Details</h2>


            <p className={styles.Name}>Name</p>
      <p  className={styles.UserName}> Dablah Samuel</p>


      <p className={styles.Contact}>Contact</p>
      <p className={styles.UserContact}>0546679987</p>

      <p className={styles.Delivery}>Delivery Location</p>
      <p className={styles.UserDelivery}>Spintex Soromall</p>
        </div>
        <div className={styles.orderslip}>
       <h2 className={styles.header}>Order Details</h2> 

       <p className={styles.Item}>1 strand Paracetamol (500mg)</p>
      <p className={styles.ItemPrice}> 2.00 Cedis</p>


      <p className={styles.subtotal}>subtotal</p>
      <p className={styles.subprice}>0.50 Cedis</p>

      <p className={styles.Total}>Total</p>
      <p className={styles.TotalPrice}>2.50 Cedis</p>
        </div>
     
    </div>
    )
}