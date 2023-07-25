import { useContext, useEffect } from "react";
import { Context } from "../../../context/Context";
import Card from "./Card";

function Party() {
  const { socket, user, setCard } = useContext(Context);

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
    getCard()
  }, [])

  return (
    <>
      <Card></Card><br/>
      <button onClick={nextCard}>Next card</button>
    </>
  );
}

export default Party;
