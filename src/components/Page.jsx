import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Homepage from "../pages/Homepage";
import RegisterPage from "../pages/RegisterPage";
import Navbar from "./common/Navbar";
import PrivateRoute from "./auth/PrivateRoute";
import ProfilePage from "../pages/ProfilePage";
import SingleBlog from "../pages/SingleBlog";
import AuthorPage from "../pages/AuthorPage";
import { useAuthor } from "../hooks/useAuthor";
import CreateBlog from "../pages/CreateBlog";
import Footer from "./common/Footer";
import ScrollToTop from "./common/ScrollToTop";
import EditBlog from "../pages/EditBlog";
import { useToken } from "../hooks/useToken";

const Page = () => {
  const { state } = useAuthor();
  const { locValue } = useToken();

  let isLoginUser = false;
  if (Object.keys(locValue).length > 0) {
    isLoginUser = state?.author?.id === locValue?.user?.id;
  }

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/edit-blog/:blogId" element={<EditBlog />} />
        </Route>
        <Route path="/" element={<Homepage />} exact />
        <Route
          path="/author/:authorId"
          element={isLoginUser ? <Navigate to="/profile" /> : <AuthorPage />}
        />
        <Route path="/blogs/:blogId" element={<SingleBlog />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Page;
