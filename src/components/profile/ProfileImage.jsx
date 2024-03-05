import { useRef } from "react";
import editIcon from "../../assets/icons/edit.svg";
import { useProfile } from "../../hooks/useProfile";
import { getDummyImage } from "../../utils";
import { useAxios } from "../../hooks/useAxios";
import { actions } from "../../actions";

const ProfileImage = () => {
  const { state, dispatch } = useProfile();
  const fileInpRef = useRef();
  const { api } = useAxios();

  const handleImgUpload = (e) => {
    e.preventDefault();
    fileInpRef.current.click();

    fileInpRef.current.addEventListener("change", selectImage);
  };

  const selectImage = async () => {
    const formData = new FormData();
    for (const file of fileInpRef.current.files) {
      formData.append("avatar", file);
    }

    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/avatar`,
        formData
      );

      if (response.status === 200) {
        console.log(response);
        dispatch({
          type: actions.profile.IMAGE_UPDATED,
          data: response.data,
        });
      }
    } catch (err) {
      dispatch({
        type: actions.profile.DATA_FETCHED_ERROR,
        error: err.message,
      });
    }
  };

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      {state?.user?.avatar === null && (
        <div className="w-full h-full bg-indigo-700 ring-2 ring-indigo-400 text-white grid place-items-center text-5xl rounded-full">
          <span className="">{getDummyImage(state?.user)}</span>
        </div>
      )}

      {state?.user?.avatar !== null && (
        <img
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
            state?.user?.avatar
          }`}
          alt={`${state?.user?.firstName} ${state?.user?.lastName}`}
          className="w-full h-full ring-2 ring-indigo-400 rounded-full"
        />
      )}

      {state.error && (
        <div>
          <i>There was a error while uploading the image. Please try again!</i>
        </div>
      )}

      <form>
        <button
          onClick={handleImgUpload}
          className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
        >
          <img src={editIcon} alt="Edit" />
        </button>

        <input type="file" ref={fileInpRef} hidden />
      </form>
    </div>
  );
};

export default ProfileImage;
