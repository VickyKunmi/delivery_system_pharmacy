// import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import Header from "./categoryHeader";
import styles from "../styles/Drug.module.css";
import { useRouter } from "next/router";
import {addFeaturedDrug } from "@/util/helper";
import { Message } from "./Message";
import axios from "axios";
import { getServer } from "@/config";

const FeaturedDrug = ({ cat }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [price_symbol, setPriceSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [savedNotify, setSavedNotify] = useState(null);

  const router = useRouter();
  const fileInputRef = useRef(null);
  const handleAddDrug = async (model) => {
    const result = await addFeaturedDrug(model);
    const { isSaved } = result;
    if (isSaved) {
      setName("");
      setPrice("");
      setCategory("");
      setPriceSymbol("");
      setDescription("");
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      setSavedNotify(true);

      setTimeout(() => {
        setSavedNotify(false);
        router.replace(router.asPath);
      }, 1000);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dmkqhochv/image/upload",
        data
      );
      const { url } = uploadRes.data;

      if (url) {
        const model = {
          name,
          price,
          category,
          price,
          price_symbol,
          description,
          image: url,
        };
        await handleAddDrug(model);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const handleSeleectCateory

  return (
    <>
      <Header child={"Drug"}>
        <div className={styles.up}>
          {savedNotify && <Message info={"Added successfully"} />}
          <form onSubmit={handleAdd}>
            <div className={styles.items}>
              <br />

              <h1>Add Drug</h1>
              <div className={styles.itemDisplay}>
                <div className={styles.eachItem}>
                  <label>Name</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={styles.eachItem}>
                  <label>Description</label>
                  <textarea
                    className={styles.inputdesc}
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.itemDisplay}>
                <div className={styles.eachItem}>
                  <label>Category</label>
                  {/* <input type="text" className={styles.input} placeholder="Category" /> */}
                <select
                    className={styles.input}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {cat.length > 0
                      && cat.map(({ id, title }) => (
                          <option key={id} value={title}>
                            {title}
                          </option>
                        ))
                      }
                  </select>
                </div>
                <div className={styles.eachItem}>
                  <label>Price symbol</label>
                  <select
                    // value={price_symbol}
                    className={styles.input}
                    onChange={(e) => setPriceSymbol(e.target.value)}
                  >
                    <option></option>
                    <option>$</option>
                    <option>Cedis</option>
                    <option>#</option>
                  </select>
                </div>
                {/* <input type="text" className={styles.input} placeholder="Price" /> */}
              </div>
              <div className={styles.itemDisplay}>
                <div className={styles.eachItem}>
                  <label>Price</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="e.g 20"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className={styles.eachItem}>
                  <label>Image</label>
                  <input
                    type="file"
                    className={styles.input}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
              </div>
            </div>
            <button className={styles.button} type="submit">Add</button>
          </form>
        </div>
      </Header>
    </>
  );
};

export default FeaturedDrug;
