import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import Card from "./Card";

function Party() {
  const { socket, user, setCard, setAllowChoose } = useContext(Context);

  const getCard = () => {
    socket.emit("client: getCard", user.id);
    socket.on("server: updateCard", (card) => setCard(card));
    return () => socket.off("server: updateCard")
  };

  const nextCard = () => {
    socket.emit("client: nextCard", user.id)
    socket.on("client: nextCard-finish", () => getCard())
  }

  useEffect(() => {
    socket.emit("client: startParty-finish", user.codeRoom)
    socket.on("client: chooserUser", (userId) => {
      if (userId === user.id) setAllowChoose(true)
    })
    getCard()
  }, [user, socket])

  return (
    <>
      <Card></Card><br/>
      <button onClick={nextCard}>Next card</button>
    </>
  );
}

export default Party;
