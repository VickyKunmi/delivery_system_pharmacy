import React, { useState } from "react";
import Header from "./categoryHeader";
import styles from "../styles/Rider.module.css";
import { Switch } from "@mui/material";
import { useRouter } from "next/router";
import { addRider } from "@/util/helper";
import { Message } from "./Message";

export default function RiderHeader() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserame] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [plate_number, setPlate_number] = useState("");
  const [address, setAddress] = useState("");
  const [available_status, setAvailable_status] = useState("");
  const [savedNotify, setSavedNotify] = useState(null);

  const router = useRouter();

  const handleChange = (event) => {
    setAvailable_status(event.target.checked);
  };
  const handleAddRider = async (model) => {
    const result = await addRider(model);
    const { isSaved } = result;
    if (isSaved) {
      setName("");
      setAddress("");
      setAvailable_status("");
      setPassword("");
      setPhone_number("");
      setPlate_number("")
      setUserame("");
      setSavedNotify(true);
      setTimeout(() => {

        router.replace("/riders");
        setSavedNotify(false)
      }, 500);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const model = {
        name,
        username,
        phone_number,
        plate_number,
        address,
        available_status,
        password,
      };
      await handleAddRider(model);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header child={"Rider"}>
        <div className={styles.up}>
          {savedNotify && <Message info={"Added Successfully"} />}
          <form onSubmit={handleAdd}>
            <div className={styles.items}>
              <br />
              <h1>Add Rider</h1>
              <div className={styles.itemDisplay}>
                <div className={styles.eachItem}>
                  <label>Name</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Rider's name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <div className={styles.eachItem}>
                  <label>Username</label>
                  <input
                    type="text"
                    value={username}
                    className={styles.input}
                    placeholder="Rider's username"
                    onChange={(e) => setUserame(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.itemDisplay}>
                <div className={styles.eachItem}>
                  <label>Phone number</label>
                  <input
                    type="text"
                    value={phone_number}
                    className={styles.input}
                    placeholder="Rider's contact"
                    onChange={(e) => setPhone_number(e.target.value)}
                  />
                </div>
                <div className={styles.eachItem}>
                  <label>Password</label>
                  <input
                  value={password}
                    type="password"
                    className={styles.input}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className={styles.itemDisplay}>
                <div className={styles.eachItem}>
                  <label>Address</label>
                  <input
                    type="text"
                    value={address}
                    className={styles.input}
                    placeholder="Rider's Address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className={styles.eachItem}>
                  <label>Plate number</label>
                  <input
                    type="text"
                    value={plate_number}
                    className={styles.input}
                    placeholder="Plate number"
                    onChange={(e) => setPlate_number(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.itemDisplay}>
                <div className={styles.eachItem}>
                  <label>Available</label>
                  <Switch color="warning" onChange={handleChange} defaultValue={available_status} />
                </div>
              </div>
              <button className={styles.button} type="submit">
                Add
              </button>
            </div>
          </form>
        </div>
      </Header>
    </>
  );
}
