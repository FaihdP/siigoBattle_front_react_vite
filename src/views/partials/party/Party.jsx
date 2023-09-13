import { useCallback, useContext, useEffect } from "react";
import { Context } from "../../../context/Context";
import Cards from "./Cards";

function Party() {
  const { socket, user, setCards, allowChoose, setAllowChoose, setUser } = useContext(Context);

  const getCards = useCallback(() => {
    socket.emit("client: getCards", { userId: user.id, codeRoom: user.codeRoom });
    socket.on("server: updateCards", (cards) => setCards(cards));
  }, [socket, setCards, user]);
  
  useEffect(() => {
    if (user.isOwner && allowChoose === null) socket.emit("client: getFirstChooser", user.codeRoom)

    getCards()

    return () => { socket.off("server: updateCards") }
  }, [user, socket, allowChoose, getCards])

  useEffect(() => {
    const onChooserUser = (nextUserId) => {
      const chooserUser = nextUserId === user.id ? true : false 
      setAllowChoose(chooserUser)
      sessionStorage.setItem("allowChoose", chooserUser)
    }
    
    socket.on("server: chooserUser", onChooserUser)

    return () => {socket.off("server: chooserUser")}
  }, [setAllowChoose, socket, user.id])
  
  useEffect(() => {
    const onWinnerRound = (message) => {
      let victoryMessage = "Ha ganado " + message.user?.name
      if (message.user.id === user.id) {
        victoryMessage = "Has ganado este round!"
        setUser((prevUser) => ({...prevUser, cardsWon: message.user.cardsWon}))
      }
      alert(victoryMessage)
    }

    socket.on("server: winnerRound", onWinnerRound)

    return () => {
      socket.off("server: winnerRound");
      socket.off("server: nextCard");
    }
  }, [socket, setUser, user.id, getCards])

  return (
    <Cards />
  );
}

export default Party;
