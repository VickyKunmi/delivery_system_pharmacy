import { UploadImage, updateSingleDrug, updateSingleFeaturedDrug } from "@/util/helper";
import { useRouter } from "next/router";
import { useState } from "react";
import { Message } from "./Message";
import { Input, Paper } from "@mui/material";


export function UpdateFeaturedDrug({ handleClose, data, cat }) {
  const { id, name, category, description, price_symbol, price, image } = data;

  const [newName, setnewName] = useState(name);
  const [newCategory, setnewCategory] = useState(category);
  const [newDescription, setnewDescription] = useState(description);
  const [newPrice, setnewPrice] = useState(price);
  const [newPriceSymbol, setnewPriceSymbol] = useState(price_symbol);
  const [newFile, setnewFile] = useState(image);
  const [savedNotify, setSavedNotify] = useState(null);
  const router = useRouter();

  const handleEditDrug = async (models, id) => {
    const result = await updateSingleFeaturedDrug({
      featuredDrugId: id,
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
      if (newFile === image) {
        const models = {
          name: newName,
          description: newDescription,
          category: newCategory,
          price: newPrice,
          price_symbol: newPriceSymbol,
          image: newFile,
        };
        return handleEditDrug(models, id);
      } else {
        const imgData = new FormData();
        imgData.append("file", newFile);
        imgData.append("upload_preset", "uploads");
        const imageUrl = await UploadImage(imgData);
        if (imageUrl) {
          const models = {
            name: newName,
            description: newDescription,
            category: newCategory,
            price: newPrice,
            price_symbol: newPriceSymbol,
            image: imageUrl,
          };
          return handleEditDrug(models, id);
        }
        
      }
      // console.log("Success")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleEdit}>
      <div>{savedNotify && <Message info={"Updated successfully"} />}</div>
      <Paper elevation={0} sx={{ p: "1em" }}>
        <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
          <h4>Name</h4>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            defaultValue={name}
            onInput={(e) => setnewName(e.target.value)}
          />
        </Paper>
        <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
          <h4>Category</h4>
          <select
            // className={styles.input}
            defaultValue={category}
            onInput={(e) => setnewCategory(e.target.value)}
          >
            {/* <option defaultValue={category}></option> */}
            {cat.length > 0
              ? cat.map(({ id, title }, i, k) => (
                  <option key={i} value={title}>
                    {title}
                  </option>
                ))
              : null}
          </select>
        </Paper>
        <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
          <h4>Description</h4>
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            defaultValue={description}
            onInput={(e) => setnewDescription(e.target.value)}
          />
        </Paper>
        <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
          <h4>Price Symbol</h4>
          <select
            // value={price_symbol}
            // className={styles.input}
            defaultValue={price_symbol}
            onInput={(e) => setnewPriceSymbol(e.target.value)}
          >
            <option></option>
            <option>$</option>
            <option>GH₵</option>
            <option>#</option>
          </select>
        </Paper>
        <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
          <h4>Price</h4>
          <Input
            type="text"
            name="price"
            placeholder="Pric e"
            defaultValue={price}
            onInput={(e) => setnewPrice(e.target.value)}
          />
        </Paper>
        <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
          <h4>Image</h4>
          <img src={image} alt="" width={100} height={80} />
          <Input
            type="file"
            name="image"
            placeholder="Image"
            onChange={(e) => setnewFile(e.target.files[0])}
          />
        </Paper>
        <button type="submit">Update</button>
      </Paper>
    </form>
  );
}
