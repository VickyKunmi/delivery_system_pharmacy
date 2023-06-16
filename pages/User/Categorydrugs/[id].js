import styles from "../../../styles/user/Product.module.css";
import Image from "next/image";
import Header from "@/components/user/userheader";
import Footer from "@/components/user/userfooter";
import axios from "axios";
import { getServer } from "@/config";

const Product = ({drug}) => {
  
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.left} key={drug.id}>
          <div className={styles.imgContainer}>
            <Image src={drug.image} width={400} height={400} alt=" " />
          </div>
        </div>
        <div className={styles.right}>
          <h1 className={styles.title}>{drug.name}</h1>
          <span className={styles.price}>{drug.price_symbol}{drug.price}</span>
          <p className={styles.description}>{drug.description}</p>
          <div className={styles.add}>
            <input type="number" defaultValue={1} className={styles.quantity} />
            <button className={styles.button}>Add to Cart</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;



export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await axios.get(
    `${getServer}/api/Drug/single?drugId=${id}`
  );
  return {
    props: {
      drug: res.data,
    }
  }
}