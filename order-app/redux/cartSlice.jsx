import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0,
        payment:0,
        subTotal:0,
        discount:0,
        discountAmount:0
    },
    reducers:{
        addProduct:(state,action) => {
            state.products.push(action.payload); // products dızısıne gelen butun datayı yolladık. 
            state.quantity += action.payload.quantity;
            state.subTotal += action.payload.price
            state.total += action.payload.discountPrice ? action.payload.discountPrice : action.payload.price;
            state.discount += action.payload.discount
            state.discountAmount += action.payload.discountAmount;
        },
        cancelProduct:(state,action)=>{
           state.products =  state.products.filter(item=>item._id !== action.payload._id );
           state.quantity -= action.payload.quantity;
           state.subTotal -= action.payload.price
           state.total -= action.payload.discountPrice ? action.payload.discountPrice : action.payload.price;
           state.discount -= action.payload.discount
           state.discountAmount -= action.payload.discountAmount;
        },
        reset:(state,action)=>{
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        }
    }
})

export const {addProduct,reset,cancelProduct} = cartSlice.actions;
export default cartSlice.reducer   