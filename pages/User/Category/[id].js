import styles from "../../../styles/user/Category.module.css";
import Header from "../../../components/user/userheader";
import Footer from "../../../components/user/userfooter";
import Image from "next/image";
import Category from "@/components/user/CategoryNav";
import axios from "axios";
import { getServer } from "@/config";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addDrug } from "@/redux/cartSlice";
import Link from "next/link";

const Product = ({ category, drug }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const handleClick = () => {
  //   dispatch(addDrug(...name, price, quantity))
  // }

  return (
    <>
      <Header />
      <div className={styles.containers}>
        <div className={styles.lefth}>
          <Category category={category} />
        </div>
        <></>
        <div className={styles.drugicons}>
          {drug.map((drugInfo) => (
            <div className={styles.drugelements} key={drugInfo.id}>
              <Link href={`/User/Categorydrugs/${drugInfo.id}`}>
                <Image
                  src={drugInfo.image}
                  alt="drug icons"
                  width={200}
                  height={200}
                  style={{ marginLeft: "10%" }}
                />
              </Link>
              <h1 className={styles.title}>{drugInfo.name}</h1>
              <p className={styles.category}>{drugInfo.category}</p>
              {/* <p className={styles.description}>Lorem ipsum dolor sit amer consectur </p> */}
              <p className={styles.price}>
                {" "}
                {drugInfo.price} {drugInfo.price_symbol}{" "}
              </p>
              {/* <Link
                href={`/User/Categorydrugs/${drugInfo.id}`}
                style={{ textDecoration: "none" }}
              > */}
                <button className={styles.cartbutton}>Add to Cart</button>
              {/* </Link> */}
            </div>
          ))}
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default Product;

export const getServerSideProps = async (context) => {
  const res = await axios.get(`${getServer}/api/Category`);
  const category = res.data;
  console.log(category, "Category");
  let drug = [];
  const { id } = context.query;
  if (id) {
    // const categoryDetails = category.find((category) => category.title === id);
    const categoryDetail = category.filter((category) => category.title === id);
    if (categoryDetail.length > 0) {
      const singleCategory = categoryDetail[0].title;
      const drugResponse = await axios.get(
        `${getServer}/api/Drug/${singleCategory}`
      );
      drug = drugResponse.data;
      console.log(drug, "help");
    } else {
      console.log("No data");
    }
  }
  return {
    props: {
      category,
      drug,
    },
  };
};
