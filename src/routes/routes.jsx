import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RoomManager from "../views/partials/RoomManager";
import PartyHeader from "../views/layout/PartyHeader";
import Room from "../views/partials/Room";
import Party from "../views/partials/party/Party";
import { StatesParty } from "../logic/enums/Enums";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Error</h1>,
  },
  {
    path: "/roomManager",
    element: (
      <App>
        <RoomManager />
      </App>
    ),
  },
  {
    path: "/room",
    element: (
      <PartyHeader stateParty={StatesParty.BEFORE}>
        <Room />
      </PartyHeader>
    ),
  },
  {
    path: "/party",
    element: (
      <PartyHeader stateParty={StatesParty.OVER}>
        <Party />
      </PartyHeader>
    ),
  },
  {
    path: "/finish",
    element: (
      <PartyHeader stateParty={StatesParty.AFTER}>
        <Room />
      </PartyHeader>
    ),
  },
]);

export default router;
