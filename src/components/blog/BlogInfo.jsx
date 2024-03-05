import DOMPurify from "dompurify";
import { getDummyImage } from "../../utils";
import { useAuthor } from "../../hooks/useAuthor";
import { actions } from "../../actions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogInfo = ({ blog }) => {
  const blogTags = blog?.tags?.split(",");
  const user = blog?.author;
  const { dispatch } = useAuthor();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    dispatch({ type: actions.author.DATA_FETCHING });
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${blog?.author?.id}`
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

  return (
    <section>
      <div className="container text-center py-8">
        <h1 className="font-bold text-3xl md:text-5xl">{blog?.title}</h1>
        <div className="flex justify-center items-center my-4 gap-4">
          <div className="flex items-center capitalize space-x-2 group">
            {user?.avatar === null && (
              <div className="flex items-center">
                <div className="avater-img bg-indigo-700 ring-2 ring-indigo-400 text-white">
                  <span className="">{getDummyImage(user)}</span>
                </div>
                <span className="text-white ml-2">{user?.firstName}</span>
              </div>
            )}
            {user?.avatar !== null && (
              <div className="size-8 rounded-full ring-2 ring-indigo-400 flex items-center">
                <img
                  src={`${
                    import.meta.env.VITE_SERVER_BASE_URL
                  }/uploads/avatar/${user?.avatar}`}
                  alt={`${user?.firstName} ${user?.lastName}`}
                  className="w-full h-full ring-2 ring-indigo-400 rounded-full"
                />
              </div>
            )}
            <h5
              onClick={fetchProfile}
              className="text-slate-500 text-sm group-hover:text-slate-300 cursor-pointer duration-300"
            >{`${user?.firstName} ${user?.lastName}`}</h5>
          </div>
          <span className="text-sm text-slate-700 dot">June 28, 2018</span>
          <span className="text-sm text-slate-700 dot">
            {blog?.likes.length} Likes
          </span>
        </div>
        <img
          className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96 rounded-lg"
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
            blog?.thumbnail
          }`}
          alt=""
        />

        <ul className="tags">
          {blogTags?.map((tag, i) => {
            return <li key={i}>{tag}</li>;
          })}
        </ul>

        <div
          className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blog?.content),
          }}
        />
      </div>
    </section>
  );
};

export default BlogInfo;