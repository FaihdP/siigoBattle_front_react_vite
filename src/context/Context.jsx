import { createContext, useState } from "react";
import io from "socket.io-client";
import User from "../logic/classes/User";

export const Context = createContext();

const connectionSocket = io("http://localhost:4000");

export function ContextProvider({ children }) {
  let [user, setUser] = useState(new User());
  const [socket, setSocket] = useState(connectionSocket);
  const [usersRoom, setUsersRoom] = useState([]);
  const [allowChoose, setAllowChoose] = useState(false);
  const [card, setCard] = useState(null);
  
  if (!user.id) user.id = sessionStorage.getItem("id");
  if (!user.name) user.name = sessionStorage.getItem("userName");
  if (!user.codeRoom) user.codeRoom = sessionStorage.getItem("codeRoom");
  if (!user.isOwner) user.isOwner = sessionStorage.getItem("isOwner") === "true" ? true : false;
  if (!user.entryOrder) user.entryOrder = sessionStorage.getItem("entryOrder");

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        usersRoom,
        setUsersRoom,
        socket,
        setSocket,
        card,
        setCard,
        allowChoose,
        setAllowChoose
      }}
    >
      {children}
    </Context.Provider>
  );
}
