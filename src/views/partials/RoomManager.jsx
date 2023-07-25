import { useContext, useEffect } from "react";
import { Context } from "../../context/Context";
import randomHex from "../../logic/randomHEX";
import { Link, useNavigate } from "react-router-dom";
import User from "../../logic/classes/User";
import RoomConnectionStatus from "../../logic/enums/RoomConnectionStatus";

function RoomManager() {
  const { user, setUser, socket } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("server: infoConnection", (connection) => {
      if (connection.status === RoomConnectionStatus.NOT_EXISTS) alert("The code room not exists");
      
      if (connection.status === RoomConnectionStatus.IS_FULL) alert("The room is full");

      if (connection.status === RoomConnectionStatus.SUCCESSFUL) {
        setUser({...user, entryOrder: connection.playersNumber});
        sessionStorage.setItem("isOwner", false)
        sessionStorage.setItem("entryOrder", connection.playersNumber)
        navigate('/room')
      }
    });

    return () => socket.off("server: infoConnection");
  });

  return (
    <>
      <div>
        <h2>Create a new room</h2>
        <Link to="/room">
          <button
            onClick={() => {
              const randomHEX = randomHex()
              const userOwner = new User(user.id, user.name, true, randomHEX, 1)
              sessionStorage.setItem("codeRoom", randomHEX)
              sessionStorage.setItem("isOwner", true)
              sessionStorage.setItem("entryOrder", 1)
              socket.emit("client: newParty", userOwner)
              setUser(userOwner)
            }}
          >
            Let{"'"}s go!
          </button>
        </Link>
      </div>
      <div>
        <h2>Connect to room</h2>
        <input
          type="text"
          placeholder="Code room"
          onChange={(e) => {
            setUser({...user, isOwner: false, codeRoom: e.target.value});
          }}
        />
        <button onClick={() => {
          sessionStorage.setItem("codeRoom", user.codeRoom);
          socket.emit("client: tryConnectParty", user);
        }}>Let{"'"}s go!</button>
      </div>
    </>
  );
}

export default RoomManager;
