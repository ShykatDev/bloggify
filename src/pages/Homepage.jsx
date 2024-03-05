import BlogContent from "../components/home/BlogContent";

const Homepage = () => {
  return (
    <main>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <BlogContent />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Homepage;
