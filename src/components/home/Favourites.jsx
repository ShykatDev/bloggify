import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const Favourites = () => {
  const { api } = useAxios();
  const navigate = useNavigate();

  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites`
      );

      if (response.status === 200) {
        setFavourites(response.data.blogs);
      }
    };

    fetchFavourites();
  }, [api]);

  const viewBlog = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Your Favourites <i className="text-indigo-600">{favourites.length}</i>❤️
      </h3>

      {favourites.length === 0 ? (
        <div>
          <p className="mt-3 text-sm text-slate-400">{`You don't have any favourite blogs.`}</p>
        </div>
      ) : (
        <ul className="space-y-5 my-5">
          {favourites?.map((fav) => {
            const favTags = fav?.tags?.split(",");
            return (
              <li key={fav?.id} onClick={() => viewBlog(fav?.id)}>
                <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                  {fav?.title}
                </h3>
                <p className="text-slate-600 text-sm flex gap-1">
                  {favTags?.map((tag, i) => {
                    return (
                      <span key={i}>
                        {i === 0
                          ? `#${tag},`
                          : i === favTags?.length - 1
                          ? tag.replace(" ", "#")
                          : `${tag.replace(" ", "#")},`}
                      </span>
                    );
                  })}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Favourites;
