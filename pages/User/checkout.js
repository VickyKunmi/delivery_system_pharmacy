import Footer from "@/components/user/userfooter";
import Header from "@/components/user/userheader";
import styles from "../../styles/user/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getServer } from "@/config";
import { deleteSingleCart, getCarts } from "@/util/helper";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { deleteAction } from "@/redux/reducer";
import { addDrug, removeDrug, reset } from "@/redux/cartSlice";
import { useEffect } from "react";
import DeliveryAddress from "./DeliveryAddress";

const Cart = ({ orders }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const router = useRouter();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      if (cart.drugs.length === 0) {
        parsedCart.drugs.forEach((drug) => {
          dispatch(addDrug(drug));
        });
      }
    }
  }, []);

  useEffect(() => {
    // Store the cart data in local storage whenever it changes
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleCheckout = () => {
    dispatch(reset());
    sessionStorage.removeItem("cart");
  };

  const handleDelete = (drugId) => {
    dispatch(removeDrug(drugId));
    router.replace("/User/cart");
  };
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
                            <button className={styles.delete} onClick={() => handleDelete(order.id)}>Remove</button>
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
              <b className={styles.totalTextTitle}>Delivery fee</b>{cart.deliveryFee}
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
      {/* <DeliveryAddress total={cart.total}  /> */}

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
