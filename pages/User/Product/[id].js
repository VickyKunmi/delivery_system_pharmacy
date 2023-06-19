import styles from "../../../styles/user/Product.module.css";
import Image from "next/image";
import Header from "@/components/user/userheader";
import Footer from "@/components/user/userfooter";
import axios from "axios";
import { getServer } from "@/config";
import { useState } from "react";
import { useRouter } from "next/router";
import { addCart, addOrderdetail } from "@/util/helper";
import { useDispatch } from "react-redux";
import { addDrug } from "@/redux/cartSlice";

const Product = ({ featured }) => {
  const { name, image, price_symbol, price, description, id } = featured;
  const [Newname, setName] = useState(name);
  const [Newimage, setImage] = useState(image);
  const [Newprice_symbol, setPrice_symbol] = useState(price_symbol);
  const [Newprice, setPrice] = useState(price);
  const [Newdescription, setDescription] = useState(description);
  const [quantity, setQuantity] = useState(1);
  const [savedNotify, setSavedNotify] = useState(null);
  const router = useRouter();
  // const dispatch = useDispatch();
  const dispatch = useDispatch();

  
  const handleAddCart = async (model) => {
    const result = await addOrderdetail(model);
    const { isSaved } = result;
    if (isSaved) {
      setSavedNotify(true);
    }
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const model = {
        name: Newname,
        image: Newimage,
        price: Newprice,
        price_symbol: Newprice_symbol,
        description: Newdescription,
        quantity,
      };
      dispatch(addDrug({ ...model }));
      await handleAddCart(model);
      console.log(model, "models");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      {/* <form onSubmit={handleAdd}> */}
      <div className={styles.container}>
        <div className={styles.left} key={id}>
          <div className={styles.imgContainer}>
            <Image src={image} width={400} height={400} alt=" " />
          </div>
        </div>
        <div className={styles.right}>
          {/* <h1>Hello</h1> */}
          <h1
            className={styles.title}
            onChange={(e) => setName(e.target.value)}
          >
            {name}
          </h1>
          <span className={styles.price}>
            {price_symbol}
            {price}
          </span>
          <p className={styles.description}>{description}</p>
          <div className={styles.add}>
            <input
              type="number"
              defaultValue={1}
              className={styles.quantity}
              onInput={(e) => setQuantity(e.target.value)}
            />
            {/* <button className={styles.button} onClick={handleAdd}>
                Add to Cart
              </button> */}

            <button
              className={styles.button}
              onClick={handleAdd}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      {/* </form> */}
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
