import Head from "next/head";
import Header from "@/components/user/userheader";
import styles from "../../styles/user/Category.module.css";
import Footer from "@/components/user/userfooter";
import DrugIcon from "@/components/user/DrugIcons";
import { getServer } from "@/config";
import axios from "axios";
import Category from "@/components/user/CategoryNav";
// import { paginate } from "@/utils/paginate";





export default function Index({ category, drugs }) {
  // const [currentPage, setCurrentPage] = useState(1);
  //   const pageSize = 3;
  
  //   const onPageChange = (page) => {
  //     setCurrentPage(page);
  //   };
  //   const paginatedPosts = paginate(category, currentPage, pageSize);
  return (
    <div>
      <Header />

      <Head>
        <title>Get Pills</title>
        <meta name="description" content="Get pills, any drug at all" />
        <link rel="icon" href="/GP violet.png" />
      </Head>
      <div className={styles.container}>
        <div className={styles.left}>
          <Category category={category} />
        </div>
        <div className={styles.right}>
          <DrugIcon drugs={drugs}/>

          <div></div>
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get(`${getServer}/api/Category`);
  const drug = await axios.get(`${getServer}/api/Drug`);
  const featured = await axios.get(`${getServer}/api/FeaturedDrug`);
  console.log(featured.data, "Featured");
  return {
    props: {
      category: res.data,
      drug: drug.data,
      drugs: featured.data,
    },
  };
};
