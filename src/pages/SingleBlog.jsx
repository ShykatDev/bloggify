import { useParams } from "react-router-dom";
import BlogInfo from "../components/blog/BlogInfo";
import BlogComments from "../components/blog/BlogComments";
import FloatingIcons from "../components/blog/FloatingIcons";
import { useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";
import SingleBlogLoading from "../components/loading/SingleBlogLoading";

const SingleBlog = () => {
  const [blog, setBlog] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { api } = useAxios();
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  const { blogId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const fetchBlogDetails = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`
        );
        if (response.status === 200) {
          setBlog(response.data);
          setComments(response.data?.comments);
          setLikes(response.data.likes);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogDetails();
  }, [api, blogId]);

  return (
    <main>
      {isLoading ? (
        <SingleBlogLoading />
      ) : (
        <>
          <BlogInfo blog={blog} />
          <BlogComments
            blog={blog}
            comments={comments}
            setComments={setComments}
          />
          <FloatingIcons
            blog={blog}
            comments={comments}
            likes={likes}
            setLikes={setLikes}
          />
        </>
      )}
    </main>
  );
};

export default SingleBlog;
