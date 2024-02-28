import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    quantity: 0,
    books: [],
  },
  reducers: {
    addBook: (state, action) => {
      state.books = action.payload
      state.quantity = state.books.length
    },
    removeBook: (state, action) => {
      state.books.splice(action.payload, 1);
      state.quantity -= 1;
    },
    incrementQuantity: (state, action) => {
      
      state.books.map((book, index) => {
        if(index === action.payload){
          book.quantity++
        }
        return book;
      })
    },
    decrementBook: (state, action) => {
      state.books.map((book, index) => {
        if(index === action.payload){
          if(book.quantity === 1){
            book.quantity = 1;
          }else{
            book.quantity --
          }
        }
        return book;
      })
    },
    LogoutCart:(state) =>{
      state.books = null
      state.quantity = 0
    }
  },
});

export const { addBook, removeBook, incrementQuantity,  decrementBook, LogoutCart} = CartSlice.actions;
export default CartSlice.reducer;
