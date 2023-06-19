import { getDistance } from "geolib";

const { createSlice } = require("@reduxjs/toolkit");

// const initialState = {
//   drugs: [],
//   quantity: 0,
//   deliveryFee: 0,
//   total: 0,
// };

const loadCartStateFromLocalStorage = () => {
  try {
    const serializedCartState = localStorage.getItem("cartState");
    if (serializedCartState === null) {
      return initialState;
    }
    return JSON.parse(serializedCartState);
  } catch (error) {
    return initialState;
  }
};

const saveCartStateToLocalStorage = (cartState) => {
  try {
    const serializedCartState = JSON.stringify(cartState);
    localStorage.setItem("cartState", serializedCartState);
  } catch (error) {
    // Handle error while saving to local storage
  }
};

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
      // const drug = action.payload;

      // const existingDrug = state.drugs.find((d) => d.id === drug.id);

      // if (existingDrug) {
      //   // If the drug already exists in the cart, update its quantity
      //   existingDrug.quantity += drug.quantity;
      // } else {
      //   // Otherwise, add the drug to the cart
      //   state.drugs.push({ ...drug }); // Push a new object with the spread operator
      // }

      // state.quantity += drug.quantity;
      // state.total += drug.price * drug.quantity;
      // state.totalFee = state.total;

      // saveCartStateToLocalStorage(state);
      state.drugs.push(action.payload);
      state.quantity += 1;
      state.total += action.payload.price * action.payload.quantity;
      state.totalFee +=
        action.payload.price * action.payload.quantity + state.deliveryFee;
    },
    removeDrug: (state, action) => {
      // const drugId = action.payload;

      // const index = state.drugs.findIndex((d) => d.id === drugId);

      // if (index !== -1) {
      //   const removedDrug = state.drugs.splice(index, 1)[0];

      //   state.quantity -= removedDrug.quantity;
      //   state.total -= removedDrug.price * removedDrug.quantity;
      //   state.totalFee = state.total;

        // Save the updated cart state to local storage
        // saveCartStateToLocalStorage(state);
        const drugId = action.payload;
        const drugIndex = state.drugs.findIndex((drug) => drug.id === drugId);
        if (drugIndex !== -1) {
          const removedDrug = state.drugs.splice(drugIndex, 1)[0];
          state.quantity -= 1;
          state.total -= removedDrug.price * removedDrug.quantity;
          state.totalFee -=
            removedDrug.price * removedDrug.quantity + state.deliveryFee;
        }
      }
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
    // reset: (state) => {
    reset: () => {
      // state = initialState;
      localStorage.removeItem("cartState");
      return initialState;
    },
  },
);

export const { addDrug, reset, removeDrug, updateDeliveryFee } =
  cartSlice.actions;
export default cartSlice.reducer;

// reducers.js

// import { createReducer } from "@reduxjs/toolkit";
// import { addDrug, removeDrug } from "./action";

// const initialState = {
//   drugs: [],
//   quantity: 0,
//   total: 0,
//   totalFee: 0,
// };

// const cartReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(addDrug, (state, action) => {
//       const drug = action.payload;

//       const existingDrug = state.drugs.find((d) => d.id === drug.id);

//       if (existingDrug) {
//         // If the drug already exists in the cart, update its quantity
//         existingDrug.quantity += drug.quantity;
//       } else {
//         // Otherwise, add the drug to the cart
//         state.drugs.push(drug);
//       }

//       state.quantity += drug.quantity;
//       state.total += drug.price * drug.quantity;
//       state.totalFee = state.total;
//     })
//     .addCase(removeDrug, (state, action) => {
//       const drugId = action.payload;

//       const index = state.drugs.findIndex((d) => d.id === drugId);

//       if (index !== -1) {
//         const removedDrug = state.drugs.splice(index, 1)[0];

//         state.quantity -= removedDrug.quantity;
//         state.total -= removedDrug.price * removedDrug.quantity;
//         state.totalFee = state.total;
//       }
//     });
// });

// export default cartReducer;
