import Head from "next/head";
import Header from "@/components/user/userheader";
import Carousel from "@/components/user/Carousel";
// import styles from "../../styles/user/Carousel.module.css";
import DrugIcon from "@/components/user/DrugIcons";
import Footer from "@/components/user/userfooter";
import styles from "../../styles/user/Index.module.css";

export default function Index(){
    return(
        <div>
          
            <Header/>
      
            <Head>
                <title>Get Pills</title>
                <meta name="description" content="Get pills, any drug at all" />
                <link rel="icon" href="/GP violet.png"/>
        
            </Head>
            {/* <div className={styles.caro}> */}
            <Carousel/>
            <h1 className={styles.title}>EXPLORE A COUPLE ITEMS </h1>
        <p className={styles.description}>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
        ex ea commodo consequat. 
        </p>
            <DrugIcon/>
            {/* </div> */}
<Footer/>
        </div>
    )
}