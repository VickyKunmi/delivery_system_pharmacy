import { getServer } from "@/config";
import axios from "axios";
import styles from "../styles/Login.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      await axios.post(`${getServer}/api/adminLogin`, {
        username,
        password,
      });
      router.push("/");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>GP Admin</title>
        <meta name="description" content="Get Pills" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/GP violet.png" />
      </Head>
      <div className={styles.wrapper}>
        <h1>Admin Login</h1>
        <input
          placeholder="Username"
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick} className={styles.button}>
            Sign In
        </button>
        {error && <span className={styles.error}>Wrong login details</span>}
      </div>
    </div>
  );
};

export default Login;




