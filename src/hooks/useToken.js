import { useContext } from "react";
import { LocalStorageContext } from "../context";

export const useToken = () => {
  return useContext(LocalStorageContext);
};
