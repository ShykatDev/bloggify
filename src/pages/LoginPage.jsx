import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <main>
      <section className="container">
        <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12 min-h-[70vh] flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <LoginForm />
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
