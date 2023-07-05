import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/Context";

function Party() {
  const { socket, user, setUser } = useContext(Context)
  const [cards, setCards] = useState([])

  useEffect(() => {
    socket.emit("client: getUsersCards", user.codeRoom)
    socket.on("server: updateUsersCards", usersCards => {
      setCards(usersCards.find(userCards => userCards.id == user.id).cards)
      setUser({...user, cards: cards})
    });
    return () => socket.off("server: getCards");
  }, [])

  console.log(cards)

  if (cards.length > 0) {
    return cards.map((card, index) => 
      <div key={index}>
        {card}
      </div>
    )
  }

  return <>Dealing cards...</>
}

export default Party;
