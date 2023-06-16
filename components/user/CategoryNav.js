import { useRouter } from "next/router";
import styles from "../../styles/user/Category.module.css";

const Category = ({ category, drug }) => {
  const router = useRouter();
  const {categoryTitle} = router.query;
  return (
    <>
      {/* {drug.map((drugInfo) => ( */}
        <div>
          {/* {category.length > 0 */}
            {category.map(({ id, title }, a) => (
                <ul className={styles.listing} key={id}>
                  <li className={styles.li}>
                    <a
                      className={styles.a}
                      href={`/User/Category/${encodeURIComponent(title)}`}
                    >
                      {title}
                    </a>
                  </li>
                </ul>
              ))}
        </div>
      {/* ))} */}
    </>
  );
};
export default Category;
