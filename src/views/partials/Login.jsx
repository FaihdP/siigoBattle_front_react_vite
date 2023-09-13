import { useContext } from "react";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";

function Login() {
  const { user, setUser, socket } = useContext(Context);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setUser({ ...user, name: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!user.name) {
      alert("Ingresa algun nombre de usuario");
      return;
    }

    socket.emit("client: newUser");
    socket.on("server: codeConnection", (code) => {
      setUser({ ...user, id: code });
      sessionStorage.setItem("id", code);
    });

    sessionStorage.setItem("userName", user.name);

    navigate("/roomManager");
  };

  return (
    <section className="flex flex-col items-center justify-items-center align-middle text-center">
      <form onSubmit={handleLogin}>
        <label>
          <input
            onChange={handleInput}
            type="text"
            id="first_name"
            className="
              bg-gray-50 
              border 
              border-gray-300 
              text-gray-900 
              text-sm 
              rounded
              focus:ring-blue-500 
              focus:border-blue-500 
              block w-full p-2.5 
              dark:bg-gray-700 
              dark:border-gray-600 
              dark:placeholder-gray-400 
              dark:text-white 
              dark:focus:ring-blue-500 
              dark:focus:border-blue-500
            "
            placeholder="User name"
            required
          />
        </label>
        <button
          type="button"
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mt-5"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
    </section>
  );
}

export default Login;
