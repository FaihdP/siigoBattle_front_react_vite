export default class User {
  constructor(id, name, isOwner, codeRoom) {
    this.id = id || null
    this.name = name || null
    this.codeRoom = codeRoom || null
    this.isOwner = isOwner || null
    this.cards = []
  }
}