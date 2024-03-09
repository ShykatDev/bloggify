import { useEffect } from "react";
import { useAxios } from "../hooks/useAxios";
import { useProfile } from "../hooks/useProfile";
import ProfileContainer from "../components/profile/ProfileContainer";
import { actions } from "../actions";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import { useToken } from "../hooks/useToken";

const ProfilePage = () => {
  const { locValue: auth } = useToken();

  const { api } = useAxios();
  const { state, dispatch } = useProfile();

  useEffect(() => {
    const fetchProfile = async () => {
      dispatch({ type: actions.profile.DATA_FETCHING });
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );

        if (response.status === 200) {
          dispatch({ type: actions.profile.DATA_FETCHED, data: response.data });
        }
      } catch (err) {
        dispatch({
          type: actions.profile.DATA_FETCHED_ERROR,
          error: err.message,
        });
      }
    };

    fetchProfile();
  }, []);

  if (state.loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (state.error) {
    return (
      <>
        <Error />
      </>
    );
  }

  return (
    <>
      <ProfileContainer />
    </>
  );
};

export default ProfilePage;
