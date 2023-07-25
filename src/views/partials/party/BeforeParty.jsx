import { useContext, useEffect } from "react";
import { Context } from "../../../context/Context";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BeforeParty() {
  const { user, usersRoom, setUsersRoom, socket } = useContext(Context);
  const navigate = useNavigate();
  
  useEffect(() => {
    socket.on("server: startParty", () => navigate("/party"));
    return () => socket.off("server: startParty");
  }, [navigate, socket]);

  useEffect(() => {
    socket.emit("client: getUsersRoom");
    socket.on("server: updateUsersRoom", usersRoom => setUsersRoom(usersRoom));
    return () => socket.off("server: updateUsersRoom");
  }, [navigate, socket, setUsersRoom]);

  return (
    <div>
      <h1>Siigo Match Battle</h1>
      User name: <b>{user.name}</b>
      <br />
      Code room: <b>{user.codeRoom}</b>
      <br />
      <br />
      <Button numberUsers={usersRoom.length}/>
    </div>
  );
}

export default BeforeParty; 