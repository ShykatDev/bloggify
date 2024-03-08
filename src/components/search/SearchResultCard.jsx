import { useNavigate } from "react-router-dom";

const SearchResultCard = ({ result }) => {
  const navigate = useNavigate();

  const viewBlog = () => {
    navigate(`/blogs/${result?.id}`);
  };

  return (
    <div className="flex gap-6 py-2">
      <img
        className="h-28 object-contain"
        src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
          result?.thumbnail
        }`}
        alt={`${result?.title}`}
      />
      <div className="mt-2">
        <h3
          className="text-slate-300 text-xl font-bold cursor-pointer"
          onClick={viewBlog}
        >
          {result?.title}
        </h3>

        <p className="mb-6 text-sm text-slate-500 mt-1 line-clamp-2">
          {result?.content}
        </p>
      </div>
    </div>
  );
};

export default SearchResultCard;
