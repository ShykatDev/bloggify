import { useNavigate } from "react-router-dom";
import { useFetchProfile } from "../../hooks/useFetchProfile";

const SideBlogCard = ({ blog }) => {
  const { fetchProfile } = useFetchProfile(blog?.author);
  const navigate = useNavigate();

  const viewFullBlog = () => {
    navigate(`/blogs/${blog?.id}`);
  };

  return (
    <li onClick={viewFullBlog}>
      <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
        {blog?.title}
      </h3>
      <p className="text-slate-600 text-sm">
        by
        <span
          onClick={fetchProfile}
          className="hover:text-slate-300 cursor-pointer duration-300"
        >{` ${blog?.author?.firstName} ${blog?.author?.lastName} `}</span>
        <span>| {blog?.likes?.length} Likes</span>
      </p>
    </li>
  );
};

export default SideBlogCard;
