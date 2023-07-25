import { useContext } from "react";
import { Context } from "../../../context/Context";

function Card() {

  const { card } = useContext(Context);

  if (!card) return <>Dealing cards...</>

  return (
    <>
      <h5 onClick={() => alert("xd")}>{card.code}</h5>
      <h6>{card.name}</h6>

    </>
  );
}

export default Card;
