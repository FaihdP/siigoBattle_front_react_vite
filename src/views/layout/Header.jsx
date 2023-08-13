import { useContext, useEffect } from "react";
import { Context } from "../../context/Context";

function Header({ children }) {
  let { user, socket } = useContext(Context);
  
  useEffect(() => {
    socket.on("disconnect", () => {
      socket.emit("client: userDisconnect");
    });

    return () => socket.off("disconnect");
  }, [socket]);

  return (
    <>
      <header>
        <h1>Siigo Match Battle</h1>
        <span>User: <b>{user.name && user.name !== "" ? user.name : "Enter your user name"}</b></span>
      </header>
      <main>
        {children}
      </main>
    </>
  );
}

export default Header;
