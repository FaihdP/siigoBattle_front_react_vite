import { useCallback, useContext, useEffect } from "react";
import { Context } from "../../../context/Context";
import Card from "./Card";

function Party() {
  const { socket, user, setCard, allowChoose, setAllowChoose, setUser } = useContext(Context);

  const getCard = useCallback(() => {
    socket.emit("client: getCard", user.id);
    socket.on("server: updateCard", (card) => setCard(card));
  }, [socket, setCard, user.id]);

  const nextCard = useCallback(() => {
    socket.emit("client: nextCard", user.id)
    socket.on("client: nextCard-finish", getCard)
  }, [socket, getCard, user.id]);
  
  useEffect(() => {
    if (user.isOwner && allowChoose === null) socket.emit("client: getFirstChooser", user.codeRoom)

    getCard()

    return () => {
      socket.off("server: updateCard");
    }
  }, [user, socket, allowChoose, getCard])

  useEffect(() => {
    const onChooserUser = (nextUserId) => {
      const chooserUser = nextUserId === user.id ? true : false 
      setAllowChoose(chooserUser)
      sessionStorage.setItem("allowChoose", chooserUser)
    }
    
    socket.on("server: chooserUser", onChooserUser)

    return () => {
      socket.off("server: chooserUser");
    }
  }, [setAllowChoose, socket, user.id])
  
  useEffect(() => {
    const onWinnerRound = (message) => {
      let victoryMessage = "Ha ganado " + message.user?.name
      if (message.user.id === user.id) {
        victoryMessage = "Has ganado este round!"
        setUser((prevUser) => ({...prevUser, cardsWon: message.cardsWon}))
      }
      alert(victoryMessage)
      nextCard()
    }

    socket.on("server: winnerRound", onWinnerRound)

    return () => {
      socket.off("server: winnerRound");
      socket.off("server: nextCard-finish");
    }
  }, [socket, setUser, user.id, getCard, nextCard])

  return (
    <>
      <Card></Card>
    </>
  );
}

export default Party;
