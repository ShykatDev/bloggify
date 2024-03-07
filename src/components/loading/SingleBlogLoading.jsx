const SingleBlogLoading = () => {
  return (
    <div className="container h-[90vh] flex flex-col gap-4 sm:gap-10 animate-pulse">
      <div className="top w-full flex flex-col items-center">
        <div className="w-full sm:w-3/5 mt-10">
          <div className="h-2.5 bg-gray-50 rounded-full dark:bg-gray-600 w-full mx-auto mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mx-auto mb-2.5"></div>
          <div className="flex items-center justify-center h-52 sm:h-80 rounded w-full sm:w-full dark:bg-gray-700 mt-10">
            <svg
              className="w-full h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
      </div>
      <div className="middle flex justify-center items-center gap-4 sm:mb-6">
        <div className="h-10 w-40 bg-gray-200 rounded-lg dark:bg-gray-700 "></div>
        <div className="h-10 w-40 bg-gray-200 rounded-lg dark:bg-gray-700 "></div>
        <div className="h-10 w-40 bg-gray-200 rounded-lg dark:bg-gray-700 "></div>
        <div className="h-10 w-40 bg-gray-200 rounded-lg dark:bg-gray-700 "></div>
      </div>
      <div className="bottom w-full sm:w-3/5 mx-auto mt-6 sm:mt-0">
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 hidden sm:block"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 hidden sm:block"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 hidden sm:block"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 hidden sm:block"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 hidden sm:block"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mx-auto mb-2.5 hidden sm:block"></div>
      </div>
    </div>
  );
};

export default SingleBlogLoading;
