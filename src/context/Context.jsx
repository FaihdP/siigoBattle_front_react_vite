import { createContext, useState } from "react";
import io from "socket.io-client";
import User from "../logic/classes/User";

export const Context = createContext();

const connectionSocket = io("http://localhost:4000");

export function ContextProvider({ children }) {
  let [user, setUser] = useState(new User());
  const [socket, setSocket] = useState(connectionSocket);
  const [usersRoom, setUsersRoom] = useState([]);
  
  if (!user.id) user.id = sessionStorage.getItem("id");
  if (!user.name) user.name = sessionStorage.getItem("userName");
  if (!user.codeRoom) user.codeRoom = sessionStorage.getItem("codeRoom");

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        usersRoom,
        setUsersRoom,
        socket,
        setSocket,
      }}
    >
      {children}
    </Context.Provider>
  );
}
