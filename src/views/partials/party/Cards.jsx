import { useContext } from "react"
import { Context } from "../../../context/Context"
import Card from "./Card";


function Cards() {
  const { cards } = useContext(Context)

  return (
    <>
      {cards 
        ? cards.map((card, index) => <Card key={index} card={card}/>) 
        : "Dealing cards..."}
    </>
  )
}

export default Cards
