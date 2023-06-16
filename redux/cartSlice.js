const { createSlice } = require("@reduxjs/toolkit");


const cartSlice = createSlice({
    name: "cart",
    initialState:{
        drugs:[],
        quantity:0,
        total: 0,
    },
    reducers: {
        addDrug:(state,action) => {
            state.drugs.push(action.payload);
            state.quantity +=1;
            state.total += action.payload.price * action.payload.quantity;

        },
        reset:(state) => {
            state = initialState;
          }
    }
    
})
 

export const {addDrug, reset} = cartSlice.actions;
export default cartSlice.reducer;