import { useNavigate } from "react-router-dom";
import { actions } from "../actions";
import { useAuthor } from "./useAuthor";
import axios from "axios";

export const useFetchProfile = (author) => {
  const { dispatch } = useAuthor();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    dispatch({ type: actions.author.DATA_FETCHING });
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${author?.id}`
      );

      if (response.status === 200) {
        dispatch({ type: actions.author.DATA_FETCHED, data: response.data });
        navigate(`/author/${author?.id}`);
      }
    } catch (err) {
      dispatch({
        type: actions.author.DATA_FETCHED_ERROR,
        error: err.message,
      });
    }
  };

  return { fetchProfile };
};
