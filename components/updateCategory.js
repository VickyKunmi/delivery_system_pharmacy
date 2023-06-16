import { UploadImage, updateSingleCategory } from "@/util/helper";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Message } from "./Message";
import { Input, Paper } from "@mui/material";

export function UpdateCategory({ handleClose, data }) {
  const { id, title, description, image } = data;
  const [newTitle, setnewTitle] = useState(title);
  const [newDescription, setnewDescription] = useState(description);
  const [newImage, setnewImage] = useState(image);
  const [savedNotify, setSavedNotify] = useState(null);

  const router = useRouter();
  const handleEditCategory = async (models, id) => {
    const result = await updateSingleCategory({
      categoryId: id,
      models,
    });
    if (result.isUpdated) {
      setSavedNotify(true);
      setTimeout(() => {
        handleClose();
        router.replace(router.asPath);
      }, 1000);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      if (newImage === image) {
        const models = {
          title: newTitle,
          description: newDescription,
          image: newImage,
        };
        return handleEditCategory(models, id);
      } else {
        const imgData = new FormData();
        imgData.append("file", newImage);
        imgData.append("upload_preset", "uploads");
        const url = await UploadImage(imgData);

        if (url) {
          const models = {
            title: newTitle,
            description: newDescription,
            image: url,
          };
          return handleEditCategory(models, id);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleEdit}>
      <div>{savedNotify && <Message info={"Updated successfully"} />}</div>
      <Paper elevation={0} sx={{ p: "1em" }}>
        <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            defaultValue={title}
            onInput={(e) => setnewTitle(e.target.value)}
          />
        </Paper>
        <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
          <textarea
            name="description"
            placeholder="Description"
            defaultValue={description}
            onInput={(e) => setnewDescription(e.target.value)}
          />
        </Paper>
        <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
          <img
            src={image}
            alt="category"
            style={{ width: "50px", height: "50px" }}
          />
          <Input
            type="file"
            name="image"
            onChange={(e) => setnewImage(e.target.files[0])}
          />
        </Paper>
        <button type="submit">Done</button>
      </Paper>
    </form>
  );
}
