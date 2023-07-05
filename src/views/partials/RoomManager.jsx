import { useContext, useEffect } from "react";
import { Context } from "../../context/Context";
import randomHex from "../../logic/randomHEX";
import { Link, useNavigate } from "react-router-dom";
import User from "../../logic/classes/User";

function RoomManager() {
  const { user, setUser, socket } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("server: stateConnection", (state) => {
      if (!state) {
        alert("The code room not exists");
        return;
      }
      navigate('/room')
    });

    return () => socket.off("server: stateConnection");
  });

  return (
    <>
      <div>
        <h2>Create a new room</h2>
        <Link to="/room">
          <button
            onClick={() => {
              const randomHEX = randomHex()
              const userOwner = new User(user.id, user.name, true, randomHEX)
              sessionStorage.setItem("codeRoom", randomHEX)
              socket.emit("client: newParty", userOwner)
              setUser(userOwner)
            }}
          >
            Let's go!
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
          socket.emit("client: tryConnectParty", {...user, isOwner: false});
        }}>Let's go!</button>
      </div>
    </>
  );
}

export default RoomManager;
