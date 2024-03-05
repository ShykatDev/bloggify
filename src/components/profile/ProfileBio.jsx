import { useEffect, useRef, useState } from "react";
import editIcon from "../../assets/icons/edit.svg";
import checkIcon from "../../assets/check.png";
import { useProfile } from "../../hooks/useProfile";
import { useAxios } from "../../hooks/useAxios";
import { actions } from "../../actions";
import { toast } from "react-toastify";

const ProfileBio = () => {
  const { state, dispatch } = useProfile();
  const [bio, setBio] = useState(state?.user?.bio);
  const [editMode, setEditMode] = useState(false);
  const textAreaRef = useRef(null);
  const { api } = useAxios();

  console.log(state);

  const handleBioChange = async () => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile`,
        { bio }
      );
      if (response.status === 200) {
        dispatch({
          type: actions.profile.DATA_UPDATED,
          data: response.data.user,
        });
      }
      toast.success("Profile bio updated");
      setEditMode(false);
    } catch (err) {
      dispatch({
        type: actions.profile.DATA_FETCHED_ERROR,
        error: err.message,
      });
    }
  };

  useEffect(() => {
    if (editMode) {
      textAreaRef.current.focus();
    }
  }, [editMode]);

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {editMode ? (
          <textarea
            ref={textAreaRef}
            rows={5}
            cols={60}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="p-4 text-sm bg-transparent border border-gray-700 rounded-md outline-none focus:border-indigo-500 duration-300 text-gray-400"
          />
        ) : (
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            {bio?.length === 0 ? (
              <span className="text-sm">
                Your bio will show here. Click the edit button to add.
              </span>
            ) : (
              bio
            )}
          </p>
        )}
      </div>

      {editMode ? (
        <button
          onClick={handleBioChange}
          className="flex-center size-5 rounded-full outline-none"
        >
          <img src={checkIcon} alt="Check" />
        </button>
      ) : (
        <button
          onClick={() => setEditMode(true)}
          className="flex-center h-7 w-7 rounded-full outline-none"
        >
          <img src={editIcon} alt="Edit" />
        </button>
      )}
    </div>
  );
};

export default ProfileBio;
