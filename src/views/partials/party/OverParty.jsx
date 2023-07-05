import { useContext } from "react";
import { Context } from "../../../context/Context";

function OverParty() {
  const { user } = useContext(Context);

  return (
    <div>
      <h1>Siigo Match Battle</h1>
      User name: <b>{user.name}</b>
      <br />
      Code room: <b>{user.codeRoom}</b><br/>
      Have fun!<br/>
      <button type="button">Leave</button>
    </div>
  );
}

export default OverParty;
