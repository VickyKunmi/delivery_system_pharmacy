import { updateSingleRider } from "@/util/helper";
import { Input, Paper, Switch } from "@mui/material";
import { Message } from "./Message";
import { useRouter } from "next/router";
import { useState } from "react";

export function UpdateRider({ handleClose, data }) {
  const {
    id,
    name,
    username,
    phone_number,
    password,
    address,
    available_status,
    plate_number,
  } = data;
  const [newName, setnewName] = useState(name);
  const [newUsername, setnewUsername] = useState(username);
  const [newPhonenumber, setnewPhonenumber] = useState(phone_number);
  const [newPassword, setnewPassword] = useState(password);
  const [newAddress, setnewAddress] = useState(address);
  const [newAvaialble_status, setnewAvaialble_status] =
    useState(available_status);
  const [newPlateNumber, setnewPlateNumber] = useState(plate_number);
  const [savedNotify, setSavedNotify] = useState(null);
  const handleChange = (event) => {
    setnewAvaialble_status(event.target.checked);
  };

  const router = useRouter();
  
  const handleEditRider = async (models, id) => {
    const result = await updateSingleRider({
      riderId: id,
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
      const models = {
        name: newName,
        username: newUsername,
        phone_number: newPhonenumber,
        password: newPassword,
        address: newAddress,
        available_status: newAvaialble_status,
        plate_number: newPlateNumber,
      };
      return handleEditRider(models, id);
    } catch (err) {
      console.log(err);
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
          <h4>Username</h4>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            defaultValue={username}
            onInput={(e) => setnewUsername(e.target.value)}
          />
        </Paper>
        <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
          <h4>Phone number</h4>
          <Input
            type="text"
            name="phone_number"
            placeholder="Phone number"
            defaultValue={phone_number}
            onInput={(e) => setnewPhonenumber(e.target.value)}
          />
        </Paper>
        <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
          <h4>Password</h4>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            defaultValue={password}
            onInput={(e) => setnewPassword(e.target.value)}
          />
        </Paper>
        <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
          <h4>Address</h4>
          <Input
            type="text"
            name="address"
            placeholder="Address"
            defaultValue={address}
            onInput={(e) => setnewAddress(e.target.value)}
          />
        </Paper>
        <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
          <h4>Plate number</h4>
          <Input
            type="text"  
            name="plate number"
            placeholder="Plate number"
            defaultValue={plate_number}
            onInput={(e) => setnewPlateNumber(e.target.value)}
          />
        </Paper>
        <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
          <h4>Available</h4>
          <Switch
            onInput={handleChange}
            name="available"
            color="warning"
            defaultChecked={available_status}
          />
        </Paper>
        <button type="submit">Update</button>
      </Paper>
    </form>
  );
}
