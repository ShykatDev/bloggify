import loadingIcon from "../../assets/loading.png";

const Loading = () => {
  return (
    <div className="w-screen h-[50vh] flex justify-center items-center">
      <div className="flex gap-3">
        <img src={loadingIcon} alt="loading" className="size-6 animate-spin" />
        Loading...
      </div>
    </div>
  );
};

export default Loading;
