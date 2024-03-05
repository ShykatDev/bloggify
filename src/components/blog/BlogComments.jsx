import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import { getDummyImage } from "../../utils";
import Comment from "./Comment";
import { useAxios } from "../../hooks/useAxios";
import { toast } from "react-toastify";

const BlogComments = ({ blog, comments, setComments }) => {
  const [content, setContent] = useState("");

  const { state } = useProfile();
  const { auth } = useAuth();
  const { api } = useAxios();
  const loginUser = state?.user ?? auth?.user;

  const addNewComment = async () => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog?.id}/comment`,
        { content }
      );

      if (response.status === 200) {
        setComments([...response.data.comments]);

        setContent("");
        toast.success("Comment Added");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="comments">
      <div className="mx-auto w-full md:w-10/12 container">
        <h2 className="text-3xl font-bold my-8">
          Comments ({comments?.length})
        </h2>

        {loginUser && (
          <div className="flex items -center space-x-4">
            {loginUser?.avatar === null && (
              <div className="flex items-center">
                <div className="avater-img bg-indigo-700 ring-2 ring-indigo-400 text-white">
                  <span className="">{getDummyImage(loginUser)}</span>
                </div>
                <span className="text-white ml-2">{loginUser?.firstName}</span>
              </div>
            )}
            {loginUser?.avatar !== null && (
              <div className="size-8 rounded-full ring-2 ring-indigo-400 flex items-center">
                <img
                  src={`${
                    import.meta.env.VITE_SERVER_BASE_URL
                  }/uploads/avatar/${loginUser?.avatar}`}
                  alt={`${loginUser?.firstName} ${loginUser?.lastName}`}
                  className="w-full h-full ring-2 ring-indigo-400 rounded-full"
                />
              </div>
            )}
            <div className="w-full">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                placeholder="Write a comment"
              ></textarea>
              <div className="flex justify-end mt-4">
                <button
                  onClick={addNewComment}
                  className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        )}

        {comments?.length === 0 ? (
          <div className=" my-10">
            <p className="text-gray-400 ">No comments to show.</p>
          </div>
        ) : (
          comments?.map((cmnt) => {
            return (
              <Comment
                key={cmnt?.id}
                comment={cmnt}
                blog={blog}
                setComments={setComments}
              />
            );
          })
        )}
      </div>
    </section>
  );
};

export default BlogComments;
