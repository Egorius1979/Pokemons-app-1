import { configureStore } from "@reduxjs/toolkit";
import pokeReducer from "./poke-reducer";

export default configureStore({
  reducer: {
    poke: pokeReducer,
  },
});
