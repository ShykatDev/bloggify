import BlogCard from "./BlogCard";

const BlogsList = ({ state }) => {
  return (
    <>
      {state?.blogs?.map((blog) => {
        return <BlogCard blog={blog} key={blog?.id} />;
      })}
    </>
  );
};

export default BlogsList;
