import Link from "next/link";
import styles from "../../styles/user/DrugCards.module.css";

import Image from "next/image";

const DrugCards = ({ drugs }) => {
  if(!drugs){
    return null;
  }
  return (
    <>
      {drugs.map(({ id, name, price, category, price_symbol, image }, a) => (
        <div className={styles.container} key={id}>
          <Link href={`/User/Product/${id}`} className={styles.a}>
            <Image src={image} alt="drug icons" width={200} height={200} />
          </Link>
          <h1 className={styles.title}>{name}</h1>
          <p className={styles.category}>{category}</p>
          <span className={styles.price}>
            {price_symbol}
            {price}
          </span>
          <Link href={`/User/Product/${id}`} style={{textDecoration: "none"}}>
          <button className={styles.cartbutton} >Add to Cart</button>
          </Link>
        </div>
      ))}
    </>
  );
};
export default DrugCards;
