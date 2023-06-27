
import Payment from "@/components/payment";
import Header from "@/components/user/userheader";
import Footer from "@/components/user/userfooter";
import styles from "../../styles/user/Checkout.module.css"
import { Paper } from "@mui/material";

export default function MobilePayment() {
    return(
        <div>

            <Header/>
            <div>
                <div className={styles.head}>
               <Paper>
               <Payment/>
               
               </Paper>
                </div>
        </div>
        <Footer/>
        </div>
    )
}