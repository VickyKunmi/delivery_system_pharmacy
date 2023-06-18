import { getDistance } from "geolib";

const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    drugs: [],
    quantity: 0,
    deliveryFee: 0,
    total: 0,
  },
  reducers: {
    addDrug: (state, action) => {
      state.drugs.push(action.payload);
      state.quantity += 1;
      state.total += action.payload.price * action.payload.quantity;
      state.totalFee +=
        action.payload.price * action.payload.quantity + state.deliveryFee;
    },
    updateDeliveryFee: (state, action) => {
    //   state.deliveryFee = action.payload;
    const { deliveryAddress, sourceLocation } = action.payload;

      // Calculate the distance between delivery address and source location
      const distance = getDistance(sourceLocation, deliveryAddress);

      // Assuming delivery fee is calculated based on distance
      // You can modify this calculation according to your requirements
      const deliveryFee = distance * 0.1; // Assuming delivery fee is 0.1 unit per distance unit
      state.deliveryFee = deliveryFee;
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { addDrug, reset } = cartSlice.actions;
export default cartSlice.reducer;
