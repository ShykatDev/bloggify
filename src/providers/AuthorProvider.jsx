import { useReducer } from "react";
import { AuthorContext } from "../context";
import { initialState, authorReducer } from "../reducers/AuthorReducer";

const AuthorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authorReducer, initialState);
  return (
    <AuthorContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthorContext.Provider>
  );
};

export default AuthorProvider;
