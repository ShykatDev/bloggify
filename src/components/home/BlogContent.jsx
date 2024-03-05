import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import BlogCard from "../profile/BlogCard";

const BlogContent = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs?page=1`
        );
        if (response.status === 200) {
          setBlogs(response.data.blogs);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllBlogs();
  }, []);

  return (
    <div className="space-y-3 md:col-span-5">
      {blogs?.map((blog) => {
        return <BlogCard key={blog.id} blog={blog} />;
      })}
    </div>
  );
};

export default BlogContent;
