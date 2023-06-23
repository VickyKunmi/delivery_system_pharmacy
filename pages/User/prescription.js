import Header from "../../components/user/userheader";
import Head from "next/head";
import styles from "../../styles/user/Prescription.module.css";
import Image from "next/image";

export default function Index({ category }) {
    return (
      <div>
        <Header />
        <Head>
          <title>Get Pills</title>
          <meta name="description" content="Get pills, any drug at all" />
          <link rel="icon" href="/GP violet.png" />
        </Head>

        <div className={styles.container}>



            <h1 className={styles.title}>Upload Prescription</h1>



            <Image className={styles.image}
                src="/formatt.png"
                alt="arrow"
                fill
                sizes="80vw"
                style={{
                  objectFit: "contain",
                }}
              />
            
            
             <label className={styles.label} htmlFor="contact">Enter Contact</label>
            <br></br>
        <input
              type="text"
              id="Lastname"
              name="lastname"
              className={styles.contact}
              placeholder="e.g (0540001112)"
              onChange={(e) => setPhone_no(e.target.value)}
              required
            />


<label className={styles.label} htmlFor="contact">Enter Contact</label>
            <br></br>
        <input
              type="text"
              id="Lastname"
              name="lastname"
              className={styles.contact}
              placeholder="e.g (0540001112)"
              onChange={(e) => setPhone_no(e.target.value)}
              required
            /> 
<input
              type="file"
              className={styles.choosefile}
               onChange={(e) => setFile(e.target.files[0])} required
            /> 

        </div> 



                
        </div>
)}  