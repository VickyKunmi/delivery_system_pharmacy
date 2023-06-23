import { getDistance } from "geolib";

const { createSlice } = require("@reduxjs/toolkit");


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
    totalFee: 0,
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
    removeDrug: (state, action) => {
      
        const drugId = action.payload;
        const drugIndex = state.drugs.findIndex((drug) => drug.id === drugId);
        if (drugIndex !== -1) {
          const removedDrug = state.drugs.splice(drugIndex, 1)[0];
          state.quantity -= 1;
          state.total -= removedDrug.price * removedDrug.quantity;
          state.totalFee -=
            removedDrug.price * removedDrug.quantity + state.deliveryFee;
        
        }
      },
      updateDeliveryFee: (state, action) => {
        const deliveryFee = action.payload;
        state.deliveryFee = deliveryFee;
        state.totalFee = state.total + state.deliveryFee;
      },
      updateTotalFee: (state, action) => {
        const totalFee = action.payload;
        state.totalFee = totalFee;
      },
    },
    // reset: (state) => {
    reset: () => {
      // state = initialState;
      localStorage.removeItem("cartState");
      return initialState;
    },
  },
);

export const { addDrug, reset, removeDrug, updateDeliveryFee, updateTotalFee } =
  cartSlice.actions;
export default cartSlice.reducer;


