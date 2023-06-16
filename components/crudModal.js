import { cloneElement, useState } from "react";

import styles from "../styles/Home.module.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export const CrudModal = ({
  buttonTitle,
  title,
  callbackfun,
  data = {},
  children,
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = async () => {
    await callbackfun({ data });
    setOpen(true);
  };

  return (
    <>
      <button className={styles.but} onClick={handleClickOpen}>
        {buttonTitle}
      </button>
      <Dialog
        maxWidth={"lg"}
        onClose={handleClose}
        fullWidth={true}
        open={open}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{cloneElement(children, { handleClose })}</DialogContent>
        <DialogActions>
          <button onClick={handleClose}>Close</button>
        </DialogActions>
      </Dialog>
    </>
  );
};
