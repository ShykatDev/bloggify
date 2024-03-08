import BlogForm from "../components/blog/BlogForm";

const CreateBlog = () => {
  return (
    <main>
      <section>
        <div className="container min-h-[75vh] flex flex-col justify-center">
          <BlogForm isEdit={false} />
        </div>
      </section>
    </main>
  );
};

export default CreateBlog;
