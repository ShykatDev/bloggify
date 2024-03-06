import { Link } from "react-router-dom";
import BlogContent from "../components/home/BlogContent";
import Favourites from "../components/home/Favourites";
import MostPopular from "../components/home/MostPopular";
import { useAuth } from "../hooks/useAuth";

const Homepage = () => {
  const { auth } = useAuth();
  return (
    <main>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <BlogContent />

            <div className="md:col-span-2 h-full w-full space-y-5">
              <MostPopular />
              {auth !== null && auth?.accessToken ? (
                <Favourites />
              ) : (
                <div className="sidebar-card">
                  <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
                    Your Favourites ❤️
                  </h3>
                  <ul className="space-y-5 my-5">
                    <p className="text-slate-400 font-medium hover:text-slate-300 transition-all">
                      Please{" "}
                      <Link to="/login" className="underline text-indigo-500">
                        login
                      </Link>{" "}
                      to view favourite blogs.
                    </p>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Homepage;
