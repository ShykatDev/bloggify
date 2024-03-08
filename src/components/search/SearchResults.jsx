import SearchResultCard from "./SearchResultCard";

const SearchResults = ({ searchResult, error }) => {
  return (
    <div className="">
      <h3 className="text-slate-400 font-bold mt-6">
        Search Results{" "}
        <span className="text-indigo-500 italic">{searchResult?.length}</span>
      </h3>
      <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
        {searchResult?.length === 0 ? (
          <div>
            <p>No result found</p>
          </div>
        ) : (
          searchResult?.data?.map((res) => {
            return <SearchResultCard key={res?.id} result={res} />;
          })
        )}

        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default SearchResults;
