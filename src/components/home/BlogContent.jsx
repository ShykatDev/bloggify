import axios from "axios";
import { useRef, useState } from "react";
import { useEffect } from "react";
import BlogCard from "../profile/BlogCard";
import BlogLoading from "../loading/BlogLoading";
import Error from "../common/Error";
import emptyIcon from "../../assets/box.png";

const BlogContent = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs?page=${page}`
        );
        if (response.status === 200) {
          if (response.data.blogs.length === 0) {
            setHasMore(false);
          }

          setBlogs((prev) => [...prev, ...response.data.blogs]);
          setPage((prevPage) => prevPage + 1);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    const onIntersection = (items) => {
      const loaderItem = items[0];

      if (loaderItem.isIntersecting && hasMore) {
        fetchAllBlogs();
      }
    };

    const observer = new IntersectionObserver(onIntersection);

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // cleanup
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [hasMore, page]);

  if (error) {
    return <Error />;
  }

  return (
    <>
      <div className="space-y-3 md:col-span-5">
        {blogs?.map((blog) => {
          return <BlogCard key={blog.id} blog={blog} />;
        })}

        {hasMore ? (
          <div ref={loaderRef} className="space-y-3 md:col-span-5">
            <BlogLoading />
          </div>
        ) : (
          <div className="mt-6 border border-slate-800 bg-slate-900 p-4 rounded-lg flex flex-col justify-center items-center gap-2">
            <img src={emptyIcon} alt="empty icon" className="w-12" />
            <p className="text-slate-400">No more blog left.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogContent;
