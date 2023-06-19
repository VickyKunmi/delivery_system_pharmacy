import Head from "next/head";
import Header from "@/components/user/userheader";
import Carousel from "@/components/user/Carousel";
// import styles from "../../styles/user/Carousel.module.css";
import DrugIcon from "@/components/user/DrugIcons";
import Footer from "@/components/user/userfooter";
import styles from "../../styles/user/Index.module.css";
import axios from "axios";
import { getServer } from "@/config";

export default function Index({ drugs }) {
  return (
    <div>
      <Header />

      <Head>
        <title>Get Pills</title>
        <meta name="description" content="Get pills, any drug at all" />
        <link rel="icon" href="/GP violet.png" />
      </Head>
      {/* <div className={styles.caro}> */}
      <Carousel />
      <h1 className={styles.title}>EXPLORE A COUPLE ITEMS </h1>
      <p className={styles.description}>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <DrugIcon drugs={drugs} />
      {/* </div> */}
      <Footer />
    </div>
  );
}

export const getServerSideProps = async () => {
    const response = await axios.get(`${getServer}/api/FeaturedDrug`);
    const featuredDrugs = response.data; // Extract the data property from the response
  
    return {
      props: {
        drugs: featuredDrugs, // Pass the extracted data as props
      },
    };
  };
  
