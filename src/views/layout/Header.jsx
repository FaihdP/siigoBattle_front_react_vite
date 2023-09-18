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
      <header className="pt-20 px-4 mx-auto lg:max-w-6xl lg:pt-40 lg:px-6">
        <div className="mx-auto text-center mb-32">
          <h2 className="mb-4 text-7xl lg:text-8xl tracking-tight font font-extrabold text-white">
            Siigo Match Battle
          </h2>
          <div className="
            inline-block
            mt-16
            px-14
            py-2.5
            bg-blue-500 
            rounded-lg 
            [box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
            border-b-[0px]
            cursor-default
            hover:-translate-y-2 
            transition-all 
            hover:[box-shadow:0_10px_0_0_#1b6ff8]
            hover:border-b-[1px] 
            border-blue-400
          ">
            <span className="
              flex 
              flex-col 
              justify-center 
              items-center 
              text-white 
              font-semibold 
              text-3xl
            ">
              {user.name && user.name !== "" ? user.name : "Enter your user name"}
            </span>
          </div>
        </div>
      </header>
      <main>
        {children}
      </main>
    </>
  );
}

export default Header;
