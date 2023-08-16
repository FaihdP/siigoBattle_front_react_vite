import { useContext } from "react";
import { Context } from "../../../context/Context";

function Card() {

  const { card, allowChoose, socket, user } = useContext(Context);

  if (!card) return <>Dealing cards...</>

  function sendFeatureChoosed(feature) {
    if (allowChoose) socket.emit("client: choosedFeature", {feature, userId: user.id})
  }

  return (
    <>
      <br />
      {allowChoose && <div style={{display: "block"}}>You choose!</div>}
      <br />
      <div style={{background: 'rgb(32, 35, 37)', display: "inline-block"}}>
        <div>Codigo: {card.code}</div>
        <div>Nombre: {card.name}</div>
        <div>Img: {card.img}</div>
        <div onClick={() => sendFeatureChoosed("cylinder")}>Cilindraje: {card.cylinder}</div>
        <div onClick={() => sendFeatureChoosed("cylinders")}>Cilindros: {card.cylinders}</div>
        <div onClick={() => sendFeatureChoosed("horsepower")}>Caballos de fuerza: {card.horsepower}</div>
        <div onClick={() => sendFeatureChoosed("revolutions")}>Revoluciones: {card.revolutions}</div>
        <div onClick={() => sendFeatureChoosed("weight")}>Peso: {card.weight}</div>
      </div>
    </>
  );
}

export default Card;
