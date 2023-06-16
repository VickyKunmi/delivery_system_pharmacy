import Head from "next/head";
import styles from "../../styles/user/DeliveryAddress.module.css";
import Header from "@/components/user/userheader";
import Footer from "../../components/user/userfooter";


export default function DeliveryAddress(){
    return(
        <>
            <Head>
                <title>Get Pills</title>
                <meta name="description" content="Get pills, any drug at all" />
                <link rel="icon" href="/GP violet.png"/>
        
            </Head>
         <div className={styles.container}>
            <Header/>
            <div className={styles.orderinput}>
            <h1 className={styles.title}>Delivery Address</h1>

                <label htmlFor="first Name" className={styles.label}>First Name</label>
                <input type="text" id="firstname" name="firstname" className={styles.first} placeholder="Hayford" required />

                <label htmlFor="Last Name"  className={styles.label}>Last Name</label>
                <input type="text" id="Lastname" name="lastname" className={styles.last} placeholder="Dablah" required />

                <label htmlFor="Contact" className={styles.label}>Contact</label>
                <input type="text" id="Lastname" name="lastname" className={styles.contact} placeholder="e.g (0540001112)" required />




                <label htmlFor="Address" className={styles.label}> Delivery Address</label>
                <input type="text" id="Address" name="Address" className={styles.address} placeholder="Enter your Delivery Address" required />

            <button className={styles.button}>CHECKOUT!</button>
            </div>
            <Footer/> 

         </div>
       
         </>
    )
}