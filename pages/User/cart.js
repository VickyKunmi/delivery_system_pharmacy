import Footer from "@/components/user/userfooter";
import Header from "@/components/user/userheader";
import styles from "../../styles/user/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getServer } from "@/config";
const Cart = ({ orders }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const deleteId = useSelector((state) => state.app.client.deleteId)
  const deleteHandler = async () => {
    if(deleteId) {

    }
  }

  return (
    <div className={styles.headfoot}>
      <Header />

      <div className={styles.container}>
        <div className={styles.left}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.tr}>
                <th>Product</th>
                <th>Name</th>
                {/* <th>Category</th> */}
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
              {/* <div> */}
               
                      {cart.drugs.map((order, index) => (
                          <tr className={styles.tr} key={index}>
                          <td>
                            <div className={styles.imgContainer}>
                              <Image
                                src={order.image}
                                width={50}
                                height={50}
                                style={{ objectFit: "cover" }}
                                alt=""
                              />
                            </div>
                          </td>
                          <td>
                            <div className={styles.name}>{order.name}</div>
                          </td>
                          {/* <td>
                        <div className={styles.category}>Sexual Safety</div>
                    </td> */}
                          <td>
                            <div className={styles.price}>{order.price}{order.price_symbol}</div>
                          </td>

                          <td>
                            <div className={styles.quantity}>{order.quantity}</div>
                          </td>

                          <td>
                            <div className={styles.total}>{order.price_symbol}{order.price * order.quantity}</div>
                          </td>

                          <td>
                            <button className={styles.delete}>Remove</button>
                          </td>
                        </tr>
                      ))}
                    
              {/* </div> */}
            </tbody>
          </table>
        </div>

        <div className={styles.right}>
          <div className={styles.wrapper}>
            <h2 className={styles.title}>CART TOTAL</h2>

            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Total Price:</b>{cart.total}
            </div>

            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Delivery fee</b>0.00 Cedis
            </div>

            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Total:</b>{cart.totalFee}
            </div>

            <button className={styles.button}>
              <a className={styles.a} href="/User/DeliveryAddress">
                CHECKOUT
              </a>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;

// export const getServerSideProps = async (context) => {
//   const { id } = context.query;
//   const res = await axios.get(
//     `${getServer}/api/OrderDetails`
//   );
//   const data = await res.json();
//   if(res.ok && data.length > 0){
//     return {props: {orders: data}}
//   }
//   return {
//     props: {
//       orders: [],
//     },
//   };
// };
