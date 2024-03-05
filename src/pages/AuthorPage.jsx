import BlogsList from "../components/profile/BlogsList";
import { useAuthor } from "../hooks/useAuthor";
import { getDummyImage } from "../utils";

const AuthorPage = () => {
  const { state } = useAuthor();

  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container">
        <div className="flex flex-col items-center py-8 text-center">
          <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            {state?.author?.avatar === null && (
              <div className="w-full h-full bg-indigo-700 ring-2 ring-indigo-400 text-white grid place-items-center text-5xl rounded-full">
                <span className="">{getDummyImage(state?.author)}</span>
              </div>
            )}

            {state?.user?.avatar !== null && (
              <img
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
                  state?.author?.avatar
                }`}
                alt={`${state?.author?.firstName} ${state?.author?.lastName}`}
                className="w-full h-full ring-2 ring-indigo-400 rounded-full"
              />
            )}

            {state.error && (
              <div>
                <i>
                  There was a error while uploading the image. Please try again!
                </i>
              </div>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
              {`${state?.author?.firstName} ${state?.author?.lastName}`}
            </h3>
            <p className="leading-[231%] lg:text-lg">{state?.author?.email}</p>
            <p className="leading-[188%] text-gray-400 lg:text-lg">
              {state?.author?.length === 0 ? (
                <span className="text-sm">There is no bio for the author.</span>
              ) : (
                state?.author?.bio
              )}
            </p>
          </div>
          <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
        </div>
        <>
          <div className="mt-6 lg:mt-8 flex justify-center items-center">
            <p>
              Author has{" "}
              <i className="text-indigo-400 font-bold">
                {state?.author?.blogs?.length}
              </i>{" "}
              blogs
            </p>
          </div>

          <div className="my-6 space-y-4">
            <BlogsList state={state?.author} />
          </div>
        </>
      </div>
    </main>
  );
};

export default AuthorPage;
