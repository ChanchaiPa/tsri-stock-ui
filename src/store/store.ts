import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { Deploy, env } from "../Environment";
import logger from 'redux-logger'

import AuthenSlicer from "./slices/authen-slice";
import LoadingSlicer from "./slices/loading-slice";
import SupplierSlice from "./slices/supplier-slice";
import GroupSlice from "./slices/group-slice";
import CategorySlice from "./slices/category-slice";
import AssetSlice from "./slices/asset-slice";


const reducer = {
    AuthenSlicer,
    LoadingSlicer,
    SupplierSlice,
    GroupSlice,
    CategorySlice,
    AssetSlice
};

export const store1 = configureStore({
    reducer,
    devTools: env.status !== Deploy.PRO,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store1.getState>;
type AppDispatch = typeof store1.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();