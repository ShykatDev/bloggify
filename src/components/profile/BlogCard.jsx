import { useNavigate } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import BlogAction from "./BlogAction";
import { useFetchProfile } from "../../hooks/useFetchProfile";
import { formatDate, getDummyImage } from "../../utils";
import { useToken } from "../../hooks/useToken";

const BlogCard = ({ blog }) => {
  const { title, content, author, likes, thumbnail } = blog;
  const { state } = useProfile();
  const { locValue: auth } = useToken();

  const navigate = useNavigate();
  const { fetchProfile } = useFetchProfile(author);

  const loginUser = auth?.user?.id === blog?.author?.id;
  let user = loginUser ? state?.user ?? auth?.user : blog?.author;

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

            {user?.avatar === null && (
              <div className="flex items-center">
                <div className="avater-img bg-indigo-700 ring-2 ring-indigo-400 text-white">
                  <span className="">{getDummyImage(user)}</span>
                </div>
              </div>
            )}

            <div>
              <h5
                onClick={fetchProfile}
                className="text-slate-500 text-sm duration-300 group-hover:text-slate-300"
              >
                {author?.firstName} {author?.lastName}
              </h5>
              <div className="flex items-center text-xs text-slate-700">
                <span>{formatDate(blog?.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="text-sm px-2 py-1 text-slate-700">
            <span>{likes?.length} Likes</span>
          </div>
        </div>
        {loginUser && <BlogAction blogId={blog?.id} />}
      </div>
    </div>
  );
};

export default BlogCard;
