export default function randomHex() {
  function letter() {
    var letters = [
      "a", "b", "c", "d", "e", "f", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    ];
    return letters[(Math.random() * 15).toFixed(0)];
  }
  
  let numberHex = "";
  for (var i = 0; i < 6; i++) {
    numberHex = numberHex + letter();
  }

  return numberHex;
}
