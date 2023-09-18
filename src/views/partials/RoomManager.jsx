import { useContext, useEffect } from "react";
import { Context } from "../../context/Context";
import randomHex from "../../logic/randomHEX";
import { Link, useNavigate } from "react-router-dom";
import User from "../../logic/classes/User";
import { RoomConnectionStatus } from "../../logic/enums/Enums";
import Button from "./Button";

function RoomManager() {
  const { user, setUser, socket } = useContext(Context);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setUser((prevUser) => ({...prevUser, isOwner: false, codeRoom: e.target.value}));
  }

  const handleCreateParty = () => {
    const randomHEX = randomHex();
    const userOwner = new User(
      user.id,
      user.name,
      true,
      randomHEX,
      1
    );

    sessionStorage.setItem("codeRoom", randomHEX);
    sessionStorage.setItem("isOwner", true);
    sessionStorage.setItem("entryOrder", 1);
    socket.emit("client: newParty", userOwner);
    
    setUser(userOwner);
  }

  const handleConnectParty = (e) => {
    e.preventDefault()
    socket.emit("client: tryConnectParty", user);
  }

  useEffect(() => {
    socket.on("server: infoConnection", (connection) => {
      if (connection.status === RoomConnectionStatus.NOT_EXISTS)
        alert("The code room not exists");

      if (connection.status === RoomConnectionStatus.IS_FULL)
        alert("The room is full");

      if (connection.status === RoomConnectionStatus.SUCCESSFUL) {
        setUser(
          (prevUser) => (
            {
              ...prevUser, 
              isOwner: false, 
              entryOrder: connection.playersNumber
            }
          )
        );

        sessionStorage.setItem("isOwner", false);
        sessionStorage.setItem("entryOrder", connection.playersNumber);
        sessionStorage.setItem("codeRoom", user.codeRoom);

        navigate("/room");
      }
    });
 
    return () => {
      socket.off("server: infoConnection")
    }

  }, [setUser, socket, navigate, user.codeRoom]);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="mx-auto">
        <section>
          <span className="block text-center font-extralight text-2xl">
            Create a new room
          </span>
          <Link to="/room">
            <Button text="Let's go!" type="submit" onClick={handleCreateParty}></Button>
          </Link>
        </section>
      </div>
      <div className="mx-auto">
        <section>
          <span className="block text-center font-extralight text-2xl">Connect to room</span>
          <form onSubmit={handleConnectParty}>
            <input
              type="text"
              placeholder="Code room"
              onChange={handleInput}
              className="block"
            />
            <Button text="Let's go!" type="submit"></Button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default RoomManager;
