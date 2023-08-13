export default class User {
  constructor(id, name, isOwner, codeRoom, entryOrder) {
    this.id = id || null
    this.name = name || null
    this.codeRoom = codeRoom || null
    this.isOwner = isOwner || null
    this.cards = []
    this.entryOrder = entryOrder || null
    this.cardsWon = []
  }
}