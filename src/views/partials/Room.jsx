import { useContext } from "react";
import { Context } from "../../context/Context";

function Room() {
  const { usersRoom } = useContext(Context);

  //console.log(usersRoom)

  let usersList =
    (usersRoom.length)
      ? <ul>{usersRoom.map((user, index) => <li key={index}>{user.name}</li>)}</ul>
      : "Waiting players..."; 

  return (
    <>
      {usersList}
    </>
  );
}

export default Room;
