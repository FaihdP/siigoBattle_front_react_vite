import { useContext, useEffect } from "react";
import { Context } from "../../context/Context";
import AfterParty from "../partials/party/AfterParty";
import BeforeParty from "../partials/party/BeforeParty";
import OverParty from "../partials/party/OverParty";
import { StatesParty } from "../../logic/enums/Enums";

function PartyHeader({ children, stateParty }) {
  const { socket, user } = useContext(Context);

  useEffect(() => {
    if (user.codeRoom) socket.emit("client: reconnectRoom", user.codeRoom);
  });

  // socket.on('disconnect', () => {
  //   socket.emit('client: disconnect')
  // })
  // return () => socket.off('client: disconnect')

  let component = null;
  switch (stateParty) {
    case StatesParty.BEFORE:
      component = <BeforeParty />;
      break;
    case StatesParty.OVER:
      component = <OverParty />;
      break;
    case StatesParty.AFTER:
      component = <AfterParty />;
      break;
  }

  return (
    <>
      <header>{component}</header>
      <main>{children}</main>
    </>
  );
}

export default PartyHeader;
