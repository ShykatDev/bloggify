import SearchResults from "./SearchResults";
import closeIcon from "../../assets/icons/close.svg";
import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";

const SearchContainer = ({ setSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);
  const { api } = useAxios();

  const handleChange = (e) => {
    e.stopPropagation();
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/search?q=${searchText}`
        );

        if (response.status === 200) {
          setSearchResult(response.data);
        }
        if (response.status === 404) {
          setError("No result found");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSearchResult();
  }, [api, searchText]);

  return (
    <>
      <section
        className="absolute left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50"
        role="dialog"
        aria-modal="true"
      >
        <div className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
          <div>
            <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">
              Search for Your Desire Blogs
            </h3>
            <input
              type="text"
              value={searchText}
              onChange={handleChange}
              placeholder="Start Typing to Search"
              className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
            />
          </div>

          {searchText.length !== 0 && (
            <SearchResults
              error={error}
              searchResult={searchResult}
              setSearch={setSearch}
            />
          )}

          <button onClick={() => setSearch(false)}>
            <img
              src={closeIcon}
              alt="Close"
              className="absolute right-2 top-2 cursor-pointer w-8 h-8"
            />
          </button>
        </div>
      </section>
    </>
  );
};

export default SearchContainer;
