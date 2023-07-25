import { useContext } from "react";
import { Context } from "../../../context/Context";
import { Link } from "react-router-dom";

function Button({ numberUsers }) {
  const { user, socket } = useContext(Context);

  const handleClick = () => {
    socket.emit("client: startParty", user.codeRoom);
  };
  
  const Button = (
    <button onClick={handleClick} disabled={!user.isOwner}>
      Lets go!!
    </button>
  );

  if (numberUsers > 1) return <Link to="/party">{Button}</Link>;
  else return <button disabled>Waiting players...</button>;
}

export default Button;
