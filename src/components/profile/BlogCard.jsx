import { useNavigate } from "react-router-dom";
import { actions } from "../../actions";
import { useProfile } from "../../hooks/useProfile";
import axios from "axios";
import { useAuthor } from "../../hooks/useAuthor";
import BlogAction from "./BlogAction";
import { useAuth } from "../../hooks/useAuth";

const BlogCard = ({ blog }) => {
  const { title, content, author, likes, thumbnail } = blog;
  const { state } = useProfile();
  const { dispatch } = useAuthor();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const loginUser = auth?.user?.id === blog?.author?.id;

  let user = loginUser ? state?.user ?? auth?.user : blog?.author;

  const fetchProfile = async () => {
    dispatch({ type: actions.author.DATA_FETCHING });
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${author?.id}`
      );

      if (response.status === 200) {
        dispatch({ type: actions.author.DATA_FETCHED, data: response.data });
        navigate("/author");
      }
    } catch (err) {
      dispatch({
        type: actions.author.DATA_FETCHED_ERROR,
        error: err.message,
      });
    }
  };

  const viewFullBlog = () => {
    navigate(`/blogs/${blog?.id}`);
  };

  return (
    <div className="blog-card" onClick={viewFullBlog}>
      <img
        className="blog-thumb"
        src={`${
          import.meta.env.VITE_SERVER_BASE_URL
        }/uploads/blog/${thumbnail}`}
        alt={`${title}`}
      />
      <div className="mt-2 relative">
        <h3 className="text-slate-300 text-xl lg:text-2xl">{title}</h3>
        <p className="mb-6 text-base text-slate-500 mt-1 line-clamp-2">
          {content}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex items-center capitalize space-x-2 group">
            {user?.avatar !== null && (
              <img
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
                  user?.avatar
                }`}
                alt={`${user?.firstName} ${user?.lastName}`}
                className="avater-img ring-2 ring-indigo-400 rounded-full"
              />
            )}

            <div>
              <h5
                onClick={fetchProfile}
                className="text-slate-500 text-sm duration-300 group-hover:text-slate-300"
              >
                {author?.firstName} {author?.lastName}
              </h5>
              <div className="flex items-center text-xs text-slate-700">
                <span>June 28, 2018</span>
              </div>
            </div>
          </div>

          <div className="text-sm px-2 py-1 text-slate-700">
            <span>{likes?.length} Likes</span>
          </div>
        </div>
        {loginUser && <BlogAction />}
      </div>
    </div>
  );
};

export default BlogCard;