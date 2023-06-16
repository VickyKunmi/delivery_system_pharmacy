import { Input, Paper, Switch } from "@mui/material";

export function ViewRider({ data }) {
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
                <h4>Username</h4>
                <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    defaultValue={username}
                    readOnly
                />
            </Paper>
            <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
                <h4>Phone number</h4>
                <Input
                    type="text"
                    name="phone_number"
                    placeholder="Phone number"
                    defaultValue={phone_number}
                    readOnly
                />
            </Paper>
            <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
                <h4>Password</h4>
                <Input
                    type="text"
                    name="password"
                    placeholder="Password"
                    defaultValue={password}
                    readOnly
                />
            </Paper>
            <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
                <h4>Address</h4>
                <Input
                    type="text"
                    name="address"
                    placeholder="Address"
                    defaultValue={address}
                    readOnly
                />
            </Paper>
            <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
                <h4>Plate number</h4>
                <Input
                    type="text"
                    name="plate number"
                    placeholder="Plate number"
                    defaultValue={plate_number}
                    readOnly
                />
            </Paper>
            <Paper sx={{ p: "1em", gap: "1em" }} elevation={0}>
                <h4>Available</h4>
                <Switch readOnly name="available" color="warning" checked={available_status} />
            </Paper>
        </Paper>
    );
}
