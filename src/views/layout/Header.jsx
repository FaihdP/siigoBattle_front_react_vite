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
      <header className="py-8 px-4 mx-auto max-w-xl lg:py-16 lg:px-6">
        <div className="mx-auto text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font font-extrabold text-white">
            Siigo Match Battle 🃏
          </h2>
          <span className="border border-transparent bg-blue-400 text-blue-700 rounded px-4 py-1 font-bold">
            {user.name && user.name !== "" ? user.name : "Enter your user name"}
          </span>
        </div>
      </header>
      <main>
        {children}
      </main>
    </>
  );
}

export default Header;
