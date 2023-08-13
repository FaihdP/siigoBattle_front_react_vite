import { useContext } from "react";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";

function Login() {
  const { user, setUser, socket } = useContext(Context);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setUser({...user, name: e.target.value});
  }

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!user.name) {
      alert("Ingresa algun nombre de usuario");
      return
    }

    socket.emit("client: newUser")
    socket.on("server: codeConnection", (code) => {
      setUser({...user, id: code})
      sessionStorage.setItem("id", code);
    })

    sessionStorage.setItem("userName", user.name);
    
    navigate("/roomManager")
  }

  return (
    <section>
      <form onSubmit={handleLogin}>
        <label>
          <input 
            type="text" 
            defaultValue={user.name}
            onChange={handleInput} 
            autoComplete="false" 
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </section>
  );
}

export default Login;
