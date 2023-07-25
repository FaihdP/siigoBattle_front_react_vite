export default class Stack {
  constructor(array) {
    this.stack = array || [] 
  }

  pop() {
    return this.stack.pop()
  }

  peek() {
    return this.stack[this.stack.length - 1]
  }
}