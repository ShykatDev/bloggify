import { useContext } from "react";
import { AuthorContext } from "../context";

export const useAuthor = () => {
  return useContext(AuthorContext);
};
