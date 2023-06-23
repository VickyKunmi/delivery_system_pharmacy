import axios from "axios";
import styles from "../../../styles/rider/OrderDetails.module.css";

import { getServer } from "@/config";
import Navsidebar from "@/components/rider/Navsidebarr";
import { Switch } from "@mui/material";
import { getSession, useSession } from "next-auth/react";
// import { useRequireAuth } from "../auth";
import { useEffect, useState } from "react";
import { useRequireAuth } from "../auth";

export default function Orderdetails({ featured, rider, user }) {
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, sePrice] = useState("")
  const [price_symbol, setPriceSymbol] = useState("")
  const [rider_name, setRider_name] = useState("")
  const [plate_number, setPlate_number] = useState("")
  const [phone_number, setphone_number] = useState("")

  const session = useRequireAuth();
  const riderDetails = session?.user;

  return (
    <>
    {session ? (
    <div>
      <Navsidebar />
      <form>
        
      <div className={styles.body}>
        {rider.length > 0 ? rider.map(({id, name, plate_number, phone_number, available_status}) => (

        <div className={styles.info} key={id}>
          <h3>Rider's Info</h3>
          <div>
           <div className={styles.items}>
           <h3>Name: </h3>
           {<h4>{name}</h4>}
           </div>
           <div className={styles.items}>

            <h3>Plate number: </h3>
            {<h4>{plate_number}</h4>}
           </div>
           <div className={styles.items}>

            <h3>Status: </h3>
            <Switch readOnly name="available" color="warning" checked={available_status} />
           </div>
          </div>
        </div>
         )): null} 

        {featured.length > 0
          ? featured.map(
              ({
                id,
                name,
                phone_no,
                address,
                orderdetails,
                deliveryfee,
                totalfee,
                price_symbol,
                createdAt,
              }) => (
                <div key={id}>
                  <div className={styles.customerslip}>
                    <h2 className={styles.header}>Customer Details</h2>
                    <p className={styles.Name}>Name</p>
                    <p className={styles.UserName}>{name}</p>
                    <p className={styles.Contact}>Contact</p>
                    <p className={styles.UserContact}>{phone_no}</p>
                    <p className={styles.Delivery}>Delivery Location</p>
                    <p className={styles.UserDelivery}>{address}</p>
                  </div>
                  <div className={styles.orderslip}>
                    <h2 className={styles.header}>Order Details</h2>
                    <p className={styles.subtotal}>time placed</p>
                    <p className={styles.subprice}>{createdAt} </p>
                    <Detailed detail={orderdetails} />
                    <p className={styles.subtotal}>Delivery fee</p>
                    <p className={styles.subprice}>
                      {deliveryfee} {price_symbol}
                    </p>

                    <p className={styles.Total}>Total</p>
                    <p className={styles.TotalPrice}>
                      {totalfee} {price_symbol}
                    </p>
                  </div>
                  <div>
                    <button className={styles.btn1} type="submit">ASSIGN TO ME</button>
                  </div>
                </div>
              )
            )
          : null}
      </div>
</form>
    </div>
     ) : (
      // Render content when the user is not authenticated
      <div>
        <alert>session expired! try to login to access page!</alert>

        {/* Render login form or redirect to the login page */}
      </div>
    )}
  </>
  );
}

const Detailed = ({ detail }) => {
  const formated = JSON.parse(detail);

  return (
    <>
      {formated.length > 0 &&
        formated.map((detail, index) => (
          <div key={index}>
            <p className={styles.Item}>{detail.quantity}x {detail.name}</p>
            <p className={styles.ItemPrice}>
              {detail.price} {detail.price_symbol}
            </p>

            {/* <p className={styles.subtotal}>subtotal</p> */}
            {/* <p className={styles.subprice}>0.50 Cedis</p> */}
          </div>
        ))}
    </>
    
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  // const { rid } = context.query;
  const res = await axios.get(
    `${getServer}/api/Delivery/single?deliveryId=${id}`
  );
  const riderRes = await axios.get(
    `${getServer}/api/Rider/single?riderId=${id}`
  );
  console.log(res.data, "res data");
  return {
    props: {
      featured: res.data,
      rider: riderRes.data,
     
    },
  };
};


