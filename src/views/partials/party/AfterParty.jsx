import { useContext } from "react";
import { Context } from "../../../context/Context";

function AfterParty() {
  const { user } = useContext(Context);

  return (
    <div>
      <h1>Siigo Match Battle</h1>
      User name: <b>{user.name}</b>
      <br />
      Code room: <b>{user.codeRoom}</b>
      Finish
      <button>Return to lobby</button>
    </div>
  );
}

export default AfterParty;
