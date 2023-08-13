import { useCallback, useContext, useEffect } from "react";
import { Context } from "../../../context/Context";
import Card from "./Card";

function Party() {
  const { socket, user, setCard, allowChoose, setAllowChoose, setUser } = useContext(Context);

  const getCard = useCallback(() => {
    socket.emit("client: getCard", user.id);
    socket.on("server: updateCard", (card) => setCard(card));
  }, [socket, setCard, user.id]);
  
  useEffect(() => {
    if (allowChoose === null && user.isOwner) 
      console.log('xd')
      socket.emit("client: getFirstChooser", user.codeRoom)

    getCard()
  }, [user, socket, allowChoose, getCard])

  useEffect(() => {
    socket.on("server: chooserUser", (userId) => {
      console.log(userId)
      console.log(user.id)
      setAllowChoose(userId === user.id ? true : false)
    })

    return () => socket.off("server: chooserUser")
  }, [setAllowChoose, socket, user.id])
  
  useEffect(() => {
    const nextCard = () => {
      socket.emit("client: nextCard", user.id)
      socket.on("client: nextCard-finish", getCard())
    }

    const handleWinnerRound = (message) => {
      let victoryMessage = "Ha ganado " + message.user.name
      if (message.user.id === user.id) {
        victoryMessage = "Has ganado este round!"
        setUser((prevUser) => ({...prevUser, cardsWon: message.cardsWon}))
      }
      alert(victoryMessage)
      nextCard()
    }

    socket.on("server: winnerRound", (message) => handleWinnerRound(message))

    return () => socket.off("server: winnerRound")
  }, [socket, setUser, user.id, getCard])

  return (
    <>
      <Card></Card>
    </>
  );
}

export default Party;
