import { useContext } from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";

function Login() {
  const { user, setUser, socket } = useContext(Context);

  function handleInput(e) {
    setUser({...user, name: e.target.value});
  }

  function handleLogin(e) {
    if (!user) {
      e.preventDefault();
      alert("Ingresa algun nombre de usuario");
    }
    socket.emit("client: newUser")
    socket.on("server: codeConnection", (code) => {
      setUser({...user, id: code})
      sessionStorage.setItem("id", code);
    })
    sessionStorage.setItem("userName", user.name);
  }

  return (
    <>
      <input type="text" onChange={(e) => handleInput(e)} autoComplete="false" />
      <Link role="button" to="/roomManager">
        <button onClick={(e) => handleLogin(e)} type="button">
          Login
        </button>
      </Link>
    </>
  );
}

export default Login;
