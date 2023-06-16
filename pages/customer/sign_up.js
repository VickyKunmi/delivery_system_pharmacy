import React, { useState } from "react";
import { TextField, Button, Grid, Box } from "@mui/material";
import styles from "../../styles/Signup.module.css";
import { useRouter } from "next/router";
import { addUser } from "@/util/helper";
import { Message } from "@/components/Message";
import Head from "next/head";

export default function SignUp() {
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [phone_number, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [savedNotify, setSavedNotify] = useState(null);

  const router = useRouter();

  const handleAddUser = async (model) => {
    const result = await addUser(model);
    const { isSaved } = result;
    if (isSaved) {
      setSavedNotify(true);
      setTimeout(() => {
        router.replace("/customer/login");
      }, 1000);
    }
  };

  const handleAddd = async (e) => {
    e.preventDefault();
    try {
      const model = {
        first_name,
        last_name,
        email,
        password,
        phone_number,
      };
      await handleAddUser(model);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>Get Pills</title>
        <meta name="description" content="Get Pills web app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <Box className={styles.gen}>
        {savedNotify && <Message info={"Account added successfully"} />}
        <form style={{ width: "100%" }} onSubmit={handleAddd}>
          <div className={styles.sign}>
            <h1>Sign Up</h1>
          </div>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                label="Phone number"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                fullWidth
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}
