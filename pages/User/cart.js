import Footer from "@/components/user/userfooter";
import Header from "@/components/user/userheader";
import styles from "../../styles/user/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
const Cart =()=>{
    const dispatch = useDispatch();
    const cart = useSelector();
    return(
        <div className={styles.headfoot}> 
            <Header/>
         
            <div className={styles.container}>
        
             <div className={styles.left}>
            <table className={styles.table}>
               <tbody>
               <tr className={styles.tr}>
                <th>Product</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
                </tr>

                <tr className={styles.tr}>
                    <td>
                        {/* <div className={styles.imgContainer}> */}
                        <Image src="/durex.png" width={50} height={50} Fill style={{objectFit:"cover"}}  alt=""/>
                        {/* </div> */}
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
                  <div className={styles.total}>7.00 Cedis</div>
                    </td>

                    <td>
                  <button className={styles.delete}>Remove</button>
                    </td>

                </tr>

                <tr className={styles.tr}>
                    <td>
                        {/* <div className={styles.imgContainer}> */}
                        <Image src="/durex.png" width={50} height={50} Fill style={{objectFit:"cover"}}  alt=""/>
                        {/* </div> */}
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
                  <div className={styles.total}>7.00 Cedis</div>
                    </td>

                    <td>
                  <button className={styles.delete}>Remove</button>
                    </td>

                </tr>


                <tr className={styles.tr}>
                    <td>
                        {/* <div className={styles.imgContainer}> */}
                        <Image src="/durex.png" width={50} height={50} Fill style={{objectFit:"cover"}}  alt=""/>
                        {/* </div> */}
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
                  <div className={styles.total}>7.00 Cedis</div>
                    </td>

                    <td>
                  <button className={styles.delete}>Remove</button>
                    </td>

                </tr>


                
               </tbody>
            </table>


             </div>

                <div className={styles.right}>
                <div className={styles.wrapper}>
                <h2 className={styles.title}>CART TOTAL</h2>
                
                <div className={styles.totalText}>
                <b className={styles.totalTextTitle}>Subtotal:</b>27.60 Cedis
                </div>

                <div className={styles.totalText}>
                <b className={styles.totalTextTitle}>Discount:</b>0.00 Cedis
                </div>

                <div className={styles.totalText}>
                <b className={styles.totalTextTitle}>Total:</b>27.60 Cedis
                </div>

                <button className={styles.button}><a className={styles.a} href="/User/DeliveryAddress">CHECKOUT</a></button>

                </div>
           
                </div>
         
         
            </div>
             
      

          <Footer/>
        </div>
    )
}

export default Cart 