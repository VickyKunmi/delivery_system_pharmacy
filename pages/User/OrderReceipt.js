import Head from "next/head";
import styles from "../../styles/user/OrderReceipt.module.css";
import Header from "../../components/user/userheader";
import Footer from "../../components/user/userfooter";

export default function Index({ category }) {
  return (
    <div>
      <Header />
      <Head>
        <title>Get Pills</title>
        <meta name="description" content="Get pills, any drug at all" />
        <link rel="icon" href="/GP violet.png" />
      </Head>

      <>
        <div className={styles.container}>
          <div className={styles.receiptbox}>
            <h2 className={styles.orderplaced}>Order Placed!</h2>

            <h4 className={styles.orderidtext}>
              Your Order ID is <br />
            </h4>
            <h3 className={styles.orderidtitle}>
              {" "}
              <b>GP23346</b>
            </h3>

            <h4 className={styles.orderstatustext}>Status</h4>
            <h4 className={styles.orderstatus}>
              <b>PENDING</b>
            </h4>

            <h4 className={styles.deliverytext}>
              <b>Delivery Address</b>
            </h4>
            <h4 className={styles.deliveryaddress}>
              <b>Okponglo Harvard, Street 46 219, 784</b>
            </h4>

            <br></br>
            {/* <b className={styles.totalTextTitle}>Subtotal:</b> 27.60 Cedis */}
             

            <h4 className={styles.item}>Paracetamol (500mg)</h4>
            <h4 className={styles.itemprice}>7.50</h4>

            <h4 className={styles.subtotal}>Subtotal </h4>
            <h4 className={styles.subtotalprice}>0.50</h4>

            <h4 className={styles.deliveryfee}>Delivery Fee</h4>
            <h4 className={styles.deliveryprice}>10.00 Cedis </h4>

          </div>

          <div className={styles.googlemap}>


          </div>
        </div>
      </>
      {/* <Footer/> */}
    </div>
  );
}
