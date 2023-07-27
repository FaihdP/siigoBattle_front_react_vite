import { useContext } from "react";
import { Context } from "../../../context/Context";

function Card() {

  const { card, allowChoose } = useContext(Context);

  if (!card) return <>Dealing cards...</>

  if (allowChoose) return (
    <>
      <h5 onClick={() => alert("xd")}>{card.code}</h5>
      <h6>{card.name}</h6>

    </>
  );

  return (
    <>
      <h5>{card.code}</h5>
      <h6>{card.name}</h6>

    </>
  );
}

export default Card;
