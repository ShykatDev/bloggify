import axios from "axios";
import { useEffect, useState } from "react";
import SideBlogCard from "./SideBlogCard";
import Error from "../common/Error";
import SidebarLoading from "../loading/SidebarLoading";

const MostPopular = () => {
  const [popularblogs, setPopularBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchAllBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/popular`
        );
        if (response.status === 200) {
          setPopularBlogs(response.data.blogs);
        }
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAllBlogs();
  }, []);

  if (isLoading) {
    return (
      <>
        <SidebarLoading />
      </>
    );
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Most Popular 👍️
      </h3>

      <ul className="space-y-5 my-5">
        {popularblogs?.map((popBlog) => {
          return <SideBlogCard key={popBlog?.id} blog={popBlog} />;
        })}
      </ul>
    </div>
  );
};

export default MostPopular;
