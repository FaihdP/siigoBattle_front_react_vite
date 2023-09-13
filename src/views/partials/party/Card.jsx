import { useContext } from "react";
import { Context } from "../../../context/Context";

function Card({ card }) {

  const { allowChoose, socket, user } = useContext(Context);

  //console.log(card);

  function emitFeatureChoosed(feature) {
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
        <div onClick={() => emitFeatureChoosed("cylinder")}>Cilindraje: {card.cylinder}</div>
        <div onClick={() => emitFeatureChoosed("cylinders")}>Cilindros: {card.cylinders}</div>
        <div onClick={() => emitFeatureChoosed("horsepower")}>Caballos de fuerza: {card.horsepower}</div>
        <div onClick={() => emitFeatureChoosed("revolutions")}>Revoluciones: {card.revolutions}</div>
        <div onClick={() => emitFeatureChoosed("weight")}>Peso: {card.weight}</div>
      </div>
    </>
  );
}

export default Card;
