import LWSlogo from "../../assets/logo.svg";
import searchIcon from "../../assets/icons/search.svg";
import { Link, useNavigate } from "react-router-dom";
import { getDummyImage } from "../../utils";
import { useProfile } from "../../hooks/useProfile";
import { actions } from "../../actions";
import { toast } from "react-toastify";
import { useState } from "react";
import SearchContainer from "../search/SearchContainer";
import Portal from "./Portal";
import { useToken } from "../../hooks/useToken";

const Navbar = () => {
  const { locValue: auth, removeLocal } = useToken();
  const { state, dispatch } = useProfile();
  const [search, setSearch] = useState(false);

  const user = state?.user ?? auth?.user;
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: actions.profile.LOGOUT_DATA });
    navigate("/login");
    toast.success("Logout Successful");
    removeLocal();
  };

  return (
    <header>
      <nav className="container">
        <div>
          <Link to="/">
            <img className="w-32" src={LWSlogo} alt="lws" />
          </Link>
        </div>
        <div>
          <ul className="flex items-center space-x-5">
            <li>
              <Link
                to="/create-blog"
                onClick={() =>
                  Object.keys(auth).length === 0 &&
                  toast.warning("Please login first")
                }
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Write
              </Link>
            </li>
            {user && (
              <li>
                <button
                  onClick={() => setSearch(true)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img src={searchIcon} alt="Search" />
                  <span>Search</span>
                </button>
              </li>
            )}
            <li>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-white/50 hover:text-white transition-all duration-200"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-white/50 hover:text-white transition-all duration-200"
                >
                  Login
                </Link>
              )}
            </li>
            <Link to="/profile">
              {/* user with no image */}
              {user?.avatar === null && (
                <div className="flex items-center">
                  <div className="avater-img bg-indigo-700 ring-2 ring-indigo-400 text-white">
                    <span className="">{getDummyImage(user)}</span>
                  </div>
                  <span className="text-white ml-2">{user?.firstName}</span>
                </div>
              )}
              {/* user with image */}
              {Object.keys(auth).length > 0 && user?.avatar !== null && (
                <div className="size-8 rounded-full ring-2 ring-indigo-400 flex items-center">
                  <img
                    src={`${
                      import.meta.env.VITE_SERVER_BASE_URL
                    }/uploads/avatar/${user?.avatar}`}
                    alt={`${user?.firstName} ${user?.lastName}`}
                    className="w-full h-full ring-2 ring-indigo-400 rounded-full"
                  />
                  <span className="text-white ml-2">{user?.firstName}</span>
                </div>
              )}
            </Link>
          </ul>
        </div>
      </nav>

      {search && (
        <Portal>
          <SearchContainer setSearch={setSearch} />
        </Portal>
      )}
    </header>
  );
};

export default Navbar;
