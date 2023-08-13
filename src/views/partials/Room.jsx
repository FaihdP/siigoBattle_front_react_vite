import { useContext } from "react";
import { Context } from "../../context/Context";

function Room() {
  const { usersRoom } = useContext(Context);

  return (
    <>
      {
        (usersRoom.length)
          ? <ul>{usersRoom.map((user, index) => <li key={index}>{user.name}</li>)}</ul>
          : "Waiting players..."
      }
    </>
  );
}

export default Room;
