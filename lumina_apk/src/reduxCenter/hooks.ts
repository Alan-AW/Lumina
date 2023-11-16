import { useSelector, useDispatch, type TypedUseSelectorHook } from "react-redux";
import type { AppState, AppDispatch } from "./index";

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch; // 这里可以再拓展下
