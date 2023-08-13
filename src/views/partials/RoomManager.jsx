import { useContext, useEffect } from "react";
import { Context } from "../../context/Context";
import randomHex from "../../logic/randomHEX";
import { Link, useNavigate } from "react-router-dom";
import User from "../../logic/classes/User";
import { RoomConnectionStatus } from "../../logic/enums/Enums";

function RoomManager() {
  const { user, setUser, socket } = useContext(Context);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setUser((prevUser) => ({...prevUser, codeRoom: e.target.value}));
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
        setUser((prevUser) => ({...prevUser, isOwner: false, entryOrder: connection.playersNumber}));

        sessionStorage.setItem("isOwner", false);
        sessionStorage.setItem("entryOrder", connection.playersNumber);
        sessionStorage.setItem("codeRoom", user.codeRoom);
        
        navigate("/room");
      }
    });
  }, [setUser, socket, navigate, user.codeRoom]);

  return (
    <>
      <section>
        <h2>Create a new room</h2>
        <Link to="/room">
          <button onClick={handleCreateParty}>
            Let{"'"}s go!
          </button>
        </Link>
      </section>
      <section>
        <h2>Connect to room</h2>
        <form onSubmit={handleConnectParty}>
          <input
            type="text"
            placeholder="Code room"
            onChange={handleInput}
          />
          <button type="submit">Let{"'"}s go!</button>
        </form>
      </section>
    </>
  );
}

export default RoomManager;
