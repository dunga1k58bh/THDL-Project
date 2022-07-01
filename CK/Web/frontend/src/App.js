import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Detail from "./page/Detail";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: 'product',
  initialState: {
    selectedRam: [],
    selectedRom: [],
    selectedDisplaySize: [],
    selectedBattery: [],
    selectedCpuType: [],
    searchValue: "",
    page: 1,
  },
  reducers: {
    updateState: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
  }
})

const store = configureStore({
  reducer: {
    product: productSlice.reducer
  },
});

export const { updateState } = productSlice.actions

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
