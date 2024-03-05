import { Slide, ToastContainer } from "react-toastify";
import Page from "./components/Page";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Page />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        theme="dark"
        transition={Slide}
      />
    </>
  );
}

export default App;
