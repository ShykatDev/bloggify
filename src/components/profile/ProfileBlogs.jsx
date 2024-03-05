import { useProfile } from "../../hooks/useProfile";
import BlogsList from "./BlogsList";

const ProfileBlogs = () => {
  const { state } = useProfile();

  console.log(state?.user);
  return (
    <>
      {state?.user?.blogs?.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-4">
          <p className="text-gray-400">
            No blog has been created yet. Click the write button to add.
          </p>
          <button className="border border-gray-600 text-white text-sm px-8 py-2 md:py-3 rounded-md hover:bg-indigo-700 hover:border-indigo-700 transition-all duration-200">
            Write
          </button>
        </div>
      ) : (
        <>
          <div className="mt-6 lg:mt-8 flex justify-between items-center">
            <h4 className=" text-xl  lg:text-2xl">Your Blogs</h4>
            <p>
              You have{" "}
              <i className="text-indigo-400 font-bold">
                {state?.user?.blogs?.length}
              </i>{" "}
              blogs
            </p>
          </div>

          <div className="my-6 space-y-4">
            <BlogsList state={state?.user} />
          </div>
        </>
      )}
    </>
  );
};

export default ProfileBlogs;
