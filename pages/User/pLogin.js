import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { getServer } from "@/config";
import { Message } from "@/components/Message";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [savedNotify, setSavedNotify] = useState(null);

  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${getServer}/api/Login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setTimeout(() => {
            router.replace("/User/prescription");
          }, 1000);
        }
      } else {
        const errData = await response.json();
        if (errData) {
          setSavedNotify(true);
          setTimeout(() => {
            router.push("/User/pLogin");
          }, 1000);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid item xs={12} sm={6} md={4}>
          {savedNotify && <Message info={"Wrong credentials, try again!"} />}
          <form onSubmit={handleLogin}>
            <Grid container spacing={2} justifyContent="center">
              <div>
                <h1>Login </h1>
              </div>
              <Grid item xs={12}>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Link href={`${getServer}/User/sign_up`}>Don't have an account</Link>
                <Button variant="text" color="primary" fullWidth>
                  Forgot Password?
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
}
