import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Login() {
  const navigate = useNavigate();
  const { user, setUser, socket } = useContext(Context);
  const [pressButton, setPressButton] = useState(false);

  const handleInput = (e) => {
    setUser({ ...user, name: e.target.value });
  };

  const handlePressButton = () => {
    setPressButton(true);
  }

  const handleShowPopup = () => {
    alert("Ingresa algun nombre de usuario");
  }

  const handleLogin = (e) => {
    e.preventDefault();

    if (!user.name) {
      handleShowPopup();
      return;
    }

    const onCodeConnection = (code) => {
      setUser({ ...user, id: code });
      sessionStorage.setItem("id", code);
    } 

    socket.emit("client: newUser");
    socket.on("server: codeConnection", onCodeConnection);

    sessionStorage.setItem("userName", user.name);

    handlePressButton()
    if (e.type === "click") navigate("/roomManager");
    if (e.type === "submit") setTimeout(() => navigate("/roomManager"), 120);
  };

  return (
    <section className="flex flex-col items-center justify-items-center align-middle text-center">
      <form onSubmit={handleLogin}>
        <input
          onChange={handleInput}
          defaultValue={user.name}
          type="text"
          id="name"
          placeholder="User name"
          autoComplete="off"
          className="
            transition-all
            bg-gray-50 
            border 
            border-gray-300 
            text-gray-900 
            text-2xl
            text-center
            rounded
            block
            py-2.5 
            px-8
            lg:px-20
            focus:ring-blue-500 
            focus:border-blue-500 
            dark:bg-gray-700 
            dark:border-gray-600 
            dark:placeholder-gray-400 
            dark:text-white 
            dark:focus:ring-blue-500 
            dark:focus:border-blue-500
          "
        />
        <Button 
          text="Login"
          pressButton={pressButton}  
          onClick={handleLogin}
        />
      </form>
    </section>
  );
}

export default Login;
