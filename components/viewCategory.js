import { Input, Paper } from "@mui/material";
import Image from "next/image";

export function ViewCategory({ data }) {
  
  const { id, title, description, image } = data;

  return (
    <Paper elevation={0} sx={{ p: "1em" }}>
      <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
        <h4>Name</h4>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          defaultValue={title}
          readOnly
        />
      </Paper>
      <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
        <h4>Position</h4>
        <textarea
          type="text"
          name="description"
          placeholder="Description"
          defaultValue={description}
          readOnly
        />
      </Paper>

      <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
        <h4>Image</h4>

        <Image src={image} alt="" width={200} height={200} />
      </Paper>
    </Paper>
  );
}
