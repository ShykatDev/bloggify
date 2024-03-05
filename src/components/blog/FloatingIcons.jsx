import likedIcon from "../../assets/icons/like.svg";
import heartIcon from "../../assets/icons/heart.svg";
import commentIcon from "../../assets/icons/comment.svg";

const FloatingIcons = ({ blog, comments }) => {
  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li>
          <img src={likedIcon} alt="like" />
          <span>{blog?.likes?.length}</span>
        </li>

        <li>
          <img src={heartIcon} alt="Favourite" />
        </li>
        <a href="#comments">
          <li>
            <img src={commentIcon} alt="Comments" />
            <span>{comments?.length}</span>
          </li>
        </a>
      </ul>
    </div>
  );
};

export default FloatingIcons;
