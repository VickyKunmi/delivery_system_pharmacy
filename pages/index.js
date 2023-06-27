import styles from "../styles/Home.module.css";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Head from "next/head";

export default function Home() {
  return (
   <>
   <Head>
   <title>Get Pills</title>
        <meta name="description" content="Get Pills web app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
   </Head>
   <div className={styles.home}>
      <Sidebar />
      <Header />
    </div>
   </>
  );
}
