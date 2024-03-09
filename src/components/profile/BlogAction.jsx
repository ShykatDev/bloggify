import dotIcon from "../../assets/icons/3dots.svg";
import editIcon from "../../assets/icons/edit.svg";
import delIcon from "../../assets/icons/delete.svg";
import { useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile";
import { actions } from "../../actions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Portal from "../common/Portal";
import DeleteConfirm from "../common/DeleteConfirm";

const BlogAction = ({ blogId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [delPopup, setDelPopup] = useState(false);
  const { api } = useAxios();
  const { dispatch } = useProfile();
  const navigate = useNavigate();

  const handleOpen = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleDeleteBlog = async (e) => {
    e.stopPropagation();
    try {
      const favToggleResponse = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}/favourite`
      );
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`
      );
      if (response.status === 200 && favToggleResponse.status === 200) {
        dispatch({ type: actions.profile.BLOG_DELETED, data: blogId });

        toast.success("Blog Deleted");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setDelPopup(false);
    setIsOpen(false);
  };

  const handleBlogEdit = (e) => {
    e.stopPropagation();
    navigate(`/edit-blog/${blogId}`);
  };

  return (
    <div className="absolute right-0 top-0">
      <button onClick={(e) => handleOpen(e)}>
        <img src={dotIcon} alt="3dots of Action" />
      </button>

      {isOpen && (
        <div className="action-modal-container">
          <button
            onClick={handleBlogEdit}
            className="action-menu-item hover:text-lwsGreen"
          >
            <img src={editIcon} alt="Edit" />
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDelPopup(true);
            }}
            className="action-menu-item hover:text-red-500"
          >
            <img src={delIcon} alt="Delete" />
            Delete
          </button>
        </div>
      )}

      {delPopup && (
        <Portal>
          <DeleteConfirm onClose={handleClose} onDelete={handleDeleteBlog} />
        </Portal>
      )}
    </div>
  );
};

export default BlogAction;
