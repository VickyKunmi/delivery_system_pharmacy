import styles from "../../../styles/user/Product.module.css";
import Image from "next/image";
import Header from "@/components/user/userheader";
import Footer from "@/components/user/userfooter";
import axios from "axios";
import { getServer } from "@/config";
import { useState } from "react";

const Product = ({ featured }) => {
  const { name, price_symbol, price, description, image } = featured;
  const [newName, setName] = useState(name);
  const [newPriceSymbol, setPriceSymbol] = useState(price_symbol);
  const [namePrice, setPrice] = useState(price);
  const [nameImage, setImage] = useState(image);
  const [newDescription, setDescription] = useState(description);
  const [newQuantity, setQuantity] = useState(null);

  // const router = 

  const handleClick = () => {


  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <form onSubmit={handleClick}>
        <div className={styles.left} key={featured.id}>
          <div className={styles.imgContainer}>
            <Image src={featured.image} width={400} height={400} alt=" " />
          </div>
        </div>
        <div className={styles.right}>
          <h1 className={styles.title}>{featured.name}</h1>
          <span className={styles.price}>
            {featured.price_symbol}
            {featured.price}
          </span>
          <p className={styles.description}>{featured.description}</p>
          <div className={styles.add}>
            <input type="number" defaultValue={1} className={styles.quantity} />
            <button className={styles.button} type="submit">
              Add to Cart
            </button>
          </div>
        </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Product;

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await axios.get(
    `${getServer}/api/FeaturedDrug/single?featuredDrugId=${id}`
  );
  return {
    props: {
      featured: res.data,
    },
  };
};
