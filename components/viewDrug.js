import drug from "@/pages/drug";

const { Paper, Input } = require("@mui/material");
const { default: Image } = require("next/image");

export function ViewDrug({ data }) {
    // console.log(data, "data")
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
          placeholder="Price"
          defaultValue={price}
          readOnly
        />
      </Paper>
      <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
        <h4>Image</h4>
        <Image src={image} alt="image" width={200} height={200} />
      </Paper>
    </Paper>
  );
}
