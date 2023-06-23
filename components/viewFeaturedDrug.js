import { UploadImage, updateSingleDrug, updateSingleFeaturedDrug } from "@/util/helper";
import { useRouter } from "next/router";
import { useState } from "react";
import { Message } from "./Message";
import { Input, Paper } from "@mui/material";


export function ViewFeaturedDrug({ data}) {
  const { id, name, category, description, price_symbol, price, image } = data;

 
  return (
      <Paper elevation={0} sx={{ p: "1em" }}>
        <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
          <h4>Name</h4>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            defaultValue={name}
            readOnly
          />
        </Paper>
        <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
          <h4>Category</h4>
          <Input
          type="text"
          name="category"
          placeholder="Category"
          defaultValue={category}
          readOnly
        />
        </Paper>
        <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
          <h4>Description</h4>
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            defaultValue={description}
            readOnly
          />
        </Paper>
        <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
          <h4>Price Symbol</h4>
          <Input
          type="text"
          name="price_symbol"
          placeholder="Price symbol"
          defaultValue={price_symbol}
          readOnly
        />
        </Paper>
        <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
          <h4>Price</h4>
          <Input
            type="text"
            name="price"
            placeholder="Pric e"
            defaultValue={price}
            readOnly
          />
        </Paper>
        <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
          <h4>Image</h4>
          <img src={image} alt="" width={200} height={200} />
         
        </Paper>
      </Paper>
  );
}
