// import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";
import Header from "./categoryHeader";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { addCategory } from "@/util/helper";
import axios from "axios";
import { Message } from "./Message";
import { useDispatch } from "react-redux";
import { useRef } from "react";

export default function TopHeader() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [savedNotify, setSavedNotify] = useState("");

  const router = useRouter();

  const fileInputRef = useRef(null);
  const handleAddCategory = async (model) => {
    const result = await addCategory(model);
    const { isSaved } = result;
    if (isSaved) {
      setTitle(""); 
      setDescription(""); 
      fileInputRef.current.value = null;
      setSavedNotify(true);
      
      setTimeout(() => {
        router.replace(router.asPath);
        setSavedNotify(false)
      }, 1000);
    }
    // useDispatch()
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
          title,
          description,
          image: url,
        };
        await handleAddCategory(model);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header child={"Category"}>
        <div className={styles.up}>
          {savedNotify && <Message info={"Added succesfully"} />}
          <form onSubmit={handleAdd}>
            <div className={styles.items}>
              <br />
              {/* <Image src={"https://unsplash.com/photos/N3ndgS6RxVc"} alt="image" width={300} height={100}/> */}

              <h1>Add Category</h1>
              <div className={styles.itemDisplay}>
                <label>Title</label>
                <input
                  value={title}
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  className={styles.input}
                  placeholder="title"
                />
              </div>
              <div className={styles.itemDisplay}>
                <label>Description</label>
                <textarea
                  value={description}
                  className={styles.inputdesc}
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className={styles.itemDisplay}>
                <label>Image</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className={styles.input}
                  ref={fileInputRef}
                />
              </div>
            </div>
            <button className={styles.button} type="submit">
              Add
            </button>
          </form>
        </div>
      </Header>
    </>
  );
}
