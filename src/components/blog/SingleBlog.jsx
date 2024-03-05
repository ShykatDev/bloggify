import { useParams } from "react-router-dom";
import BlogInfo from "./BlogInfo";
import BlogComments from "./BlogComments";
import FloatingIcons from "./FloatingIcons";
import { useEffect, useState } from "react";
import axios from "axios";

const SingleBlog = () => {
  const [blog, setBlog] = useState();
  const [comments, setComments] = useState([]);

  const { blogId } = useParams();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`
        );
        if (response.status === 200) {
          setBlog(response.data);
          setComments(response.data?.comments);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlogDetails();
  }, [blogId]);

  return (
    <main>
      <BlogInfo blog={blog} />
      <BlogComments blog={blog} comments={comments} setComments={setComments} />
      <FloatingIcons blog={blog} comments={comments} />
    </main>
  );
};

export default SingleBlog;
