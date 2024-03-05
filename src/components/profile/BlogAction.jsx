import dotIcon from "../../assets/icons/3dots.svg";
import editIcon from "../../assets/icons/edit.svg";
import delIcon from "../../assets/icons/delete.svg";
import { useState } from "react";
const BlogAction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  return (
    <div className="absolute right-0 top-0">
      <button onClick={(e) => handleOpen(e)}>
        <img src={dotIcon} alt="3dots of Action" />
      </button>

      {isOpen && (
        <div className="action-modal-container">
          <button className="action-menu-item hover:text-lwsGreen">
            <img src={editIcon} alt="Edit" />
            Edit
          </button>
          <button className="action-menu-item hover:text-red-500">
            <img src={delIcon} alt="Delete" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogAction;
