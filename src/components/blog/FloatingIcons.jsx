import likedIcon from "../../assets/icons/like.svg";
import likedFillIcon from "../../assets/icons/like-fill.svg";
import heartIcon from "../../assets/icons/heart.svg";
import heartFillIcon from "../../assets/icons/heart-filled.svg";
import commentIcon from "../../assets/icons/comment.svg";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";
import { useEffect, useState } from "react";

const FloatingIcons = ({ blog, comments, likes, setLikes }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { api } = useAxios();

  const [isLiked, setIsLiked] = useState(false);
  const [isFav, setIsFav] = useState(blog?.isFavourite);

  useEffect(() => {
    likes?.map((like) => {
      if (like?.id === auth?.user?.id) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    });
  }, [auth?.user?.id, likes]);

  useEffect(() => {
    if (blog?.isFavourite) {
      setIsFav(true);
    }
  }, [blog?.isFavourite]);

  const handleAddLike = async () => {
    if (auth === null) {
      toast.warning("Please login first");
      navigate("/login");
    } else {
      try {
        const response = await api.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog?.id}/like`
        );

        if (response.status === 200) {
          setLikes([...response.data.likes]);
          setIsLiked(response.data.isLiked);
        }
      } catch (err) {
        toast.error("There was an error.");
      }
    }
  };

  const handleAddFav = async () => {
    if (auth === null) {
      toast.warning("Please login first");
      navigate("/login");
    } else {
      try {
        const response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog?.id}/favourite`
        );

        if (response.status === 200) {
          setIsFav(response.data.isFavourite);

          if (!isFav) {
            toast.success("Blog added to favourite list");
          }
        }
      } catch (err) {
        toast.error("There was an error.");
      }
    }
  };

  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li onClick={handleAddLike}>
          <img src={isLiked ? likedFillIcon : likedIcon} alt="like" />
          <span>{likes?.length}</span>
        </li>

        <li onClick={handleAddFav}>
          <img src={isFav ? heartFillIcon : heartIcon} alt="Favourite" />
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
