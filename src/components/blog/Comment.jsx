import { getDummyImage } from "../../utils";
import delIcon from "../../assets/icons/delete.svg";
import { useAxios } from "../../hooks/useAxios";
import { useToken } from "../../hooks/useToken";
import { useState } from "react";
import { usePortal } from "../../hooks/usePortal";
import DeleteConfirm from "../common/DeleteConfirm";

const Comment = ({ blog, comment, setComments }) => {
  const [delPopup, setDelPopup] = useState(false);
  const { Portal } = usePortal();

  const bgColor = [
    "bg-orange-600",
    "bg-blue-600",
    "bg-rose-600",
    "bg-cyan-600",
    "bg-purple-600",
    "bg-red-600",
    "bg-lime-600",
  ];
  const { locValue: auth } = useToken();
  const { api } = useAxios();
  const loginUser = auth?.user?.id === comment?.author?.id;

  const random = Math.floor(Math.random() * bgColor.length);

  const deleteComment = async () => {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog?.id}/comment/${
          comment?.id
        }`
      );

      if (response.status === 200) {
        setComments([...response.data.comments]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-start space-x-4 my-8">
      {comment?.author?.avatar === null ? (
        <div className="flex items-center">
          <div className={`avater-img ${bgColor[random]} text-white`}>
            <span className="">{getDummyImage(comment?.author)}</span>
          </div>
        </div>
      ) : (
        <div className="size-8 rounded-full flex items-center">
          <img
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
              loginUser ? auth?.user?.avatar : comment?.author?.avatar
            }`}
            alt={`${comment?.author?.firstName} ${comment?.author?.lastName}`}
            className="w-full h-full rounded-full"
          />
        </div>
      )}
      <div className="w-full">
        <h5 className="text-slate -500 font-bold">{`${comment?.author?.firstName} ${comment?.author?.lastName}`}</h5>
        <p className="text-slate-300">{comment?.content}</p>
      </div>
      {loginUser && (
        <button
          onClick={() => setDelPopup(true)}
          className=" hover:text-red-500"
        >
          <img src={delIcon} alt="Delete" />
        </button>
      )}

      {delPopup && (
        <Portal>
          <DeleteConfirm
            onClose={() => setDelPopup(false)}
            onDelete={deleteComment}
          />
        </Portal>
      )}
    </div>
  );
};

export default Comment;
