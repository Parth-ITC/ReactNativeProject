import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cartData: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemToAdd = action.payload;
      const itemPresentAtIndex = state.cartData.findIndex(thisElement => {
        return thisElement.item.name === itemToAdd.name;
      });

      if (itemPresentAtIndex !== -1) {
        //item found
        const itemFoundObject = state.cartData[itemPresentAtIndex];
        itemFoundObject.quantity += 1;
        itemFoundObject.total = itemFoundObject.quantity*itemFoundObject.item.price
      } else {
        //item not found
        state.cartData.push({item: itemToAdd, quantity: 1,total:itemToAdd.price});
      }
    },
    removeCart: (state, action) => {
      const itemToAdd = action.payload;
      const itemPresentAtIndex = state.cartData.findIndex(thisElement => {
        return thisElement.item.name === itemToAdd.name;
      });

      if (itemPresentAtIndex !== -1) {
        //item found
        const itemFoundObject = state.cartData[itemPresentAtIndex];
        if (itemFoundObject.quantity == 1) {
          state.cartData.splice(itemPresentAtIndex, 1);
        } else {
          itemFoundObject.quantity -= 1;
          itemFoundObject.total = itemFoundObject.quantity*itemFoundObject.item.price
        }
      } else {
        //item not found
      }
    },
  },
  //   extraReducers: {},
});
export const {addToCart, removeCart} = cartSlice.actions;

export default cartSlice.reducer;
