import BlogForm from "../components/blog/BlogForm";

const EditBlog = () => {
  return (
    <main>
      <section>
        <div className="container min-h-[75vh] flex flex-col justify-center">
          <BlogForm isEdit={true} />
        </div>
      </section>
    </main>
  );
};

export default EditBlog;
