import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import InpField from "../common/InpField";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import { useAxios } from "../../hooks/useAxios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const BlogForm = ({ isEdit }) => {
  const [selectImg, setSelectImg] = useState(null);
  const [editedBlog, setEditedBlog] = useState(null);
  const [thumb, setThumb] = useState(null);

  const { blogId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm({ defaultValues: editedBlog });

  const fileRef = useRef(null);
  const { api } = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    for (const key in editedBlog) {
      setValue(key, editedBlog[key]);
    }
  }, [editedBlog, setValue]);

  useEffect(() => {
    if (isEdit) {
      const fetchBlog = async () => {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`
        );

        if (response.status === 200) {
          setEditedBlog(response.data);
        }
      };

      fetchBlog();
    }
  }, [api, blogId, isEdit]);

  const handleFileUpload = (e) => {
    e.preventDefault();
    fileRef.current.addEventListener("change", onSelectImg);
    fileRef.current.click();
  };

  const onSelectImg = () => {
    for (const file of fileRef.current.files) {
      setSelectImg(URL.createObjectURL(file));
      setThumb(file);
    }
  };

  const onCreateBlog = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("tags", data.tags);
    formData.append("thumbnail", thumb ?? editedBlog?.thumbnail);

    if (selectImg !== null || editedBlog?.thumbnail) {
      try {
        if (isEdit) {
          const response = await api.patch(
            `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${editedBlog?.id}`,
            formData
          );
          if (response.status === 200) {
            toast("Blog updated.");
            navigate(`/blogs/${response?.data?.id}`);
          }
        } else {
          const response = await api.post(
            `${import.meta.env.VITE_SERVER_BASE_URL}/blogs`,
            formData
          );
          if (response.status === 201) {
            toast("New blog created.");
            navigate(`/blogs/${response?.data?.blog?.id}`);
          }
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      setError("root.thumbnail", {
        type: "thumbnail",
        message: "Blog thumbnail is required",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onCreateBlog)} className="createBlog">
      {selectImg !== null && !isEdit && (
        <div className="mb-10 flex justify-center relative">
          <div className="w-1/2 relative">
            <img
              src={selectImg}
              alt="preview image"
              className="w-full rounded-lg"
            />

            {/* actions */}
            <div className="flex absolute top-3 right-3 gap-3">
              <button
                onClick={handleFileUpload}
                className="p-3 rounded-full bg-slate-900 border border-transparent hover:border-yellow-500 duration-300"
              >
                <img src={editIcon} alt="Edit" className="w-4" />
              </button>

              <button
                onClick={() => setSelectImg(null)}
                className="p-3 rounded-full bg-slate-900 border border-transparent hover:border-red-500 duration-300"
              >
                <img src={deleteIcon} alt="Delete" className="w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {isEdit && (
        <div className="mb-10 flex justify-center relative">
          <div className="w-1/2 relative">
            <img
              src={`${
                selectImg === null
                  ? `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
                      editedBlog?.thumbnail
                    }`
                  : selectImg
              }`}
              alt="preview edit image"
              className="w-full rounded-lg"
            />

            {/* actions */}
            <div className="flex absolute top-3 right-3 gap-3">
              <button
                onClick={handleFileUpload}
                className="p-3 rounded-full bg-slate-900 border border-transparent hover:border-yellow-500 duration-300"
              >
                <img src={editIcon} alt="Edit" className="w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {selectImg === null && !isEdit && (
        <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
          <div
            onClick={handleFileUpload}
            className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <p>Upload Your Image</p>
          </div>
        </div>
      )}

      {selectImg === null && (
        <i className="block text-red-500 text-sm my-4">
          {errors?.root?.thumbnail?.message}
        </i>
      )}

      <input type="file" hidden ref={fileRef} />

      <InpField error={errors.title}>
        <input
          {...register("title", { required: "Title is required" })}
          type="text"
          id="title"
          name="title"
          placeholder="Enter your blog title"
        />
      </InpField>

      <InpField error={errors.tags}>
        <input
          {...register("tags", { required: "Tags are required" })}
          type="text"
          id="tags"
          name="tags"
          placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
        />
      </InpField>

      <InpField error={errors.content}>
        <textarea
          {...register("content", { required: "Content is required" })}
          id="content"
          name="content"
          placeholder="Write your blog content"
          rows="8"
        ></textarea>
      </InpField>

      <button className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
        {isEdit ? "Update " : "Create "} Blog
      </button>
    </form>
  );
};

export default BlogForm;
