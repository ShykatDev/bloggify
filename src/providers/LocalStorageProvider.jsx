import { LocalStorageContext } from "../context";
import { useLocalStorage } from "../hooks/useLocalStorage";

const LocalStorageProvider = ({ children }) => {
  const [locValue, setLocValue] = useLocalStorage("accessToken", {});

  const addLocal = (token) => {
    const prev = localStorage.getItem("accessToken");

    if (prev) {
      localStorage.removeItem("accessToken");
    }
    setLocValue(token);
  };

  const refresh = (newToken) => {
    setLocValue({ ...locValue, accessToken: newToken });
  };

  const removeLocal = () => {
    setLocValue({});
  };

  return (
    <LocalStorageContext.Provider
      value={{ locValue, addLocal, removeLocal, refresh }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};

export default LocalStorageProvider;
