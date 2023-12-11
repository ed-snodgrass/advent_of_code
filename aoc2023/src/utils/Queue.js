class Queue {
  constructor() {
    this.tail = 0 // tail
    this.head = 0 // head
    this.items = {}
  }

  enqueue(element) {
    this.items[this.tail] = element
    this.tail++
  }

  /* remove the element which was insert first */
  dequeue() {
    if (this.isEmpty()) {
      return undefined
    }
    const result = this.items[this.head]
    delete this.items[this.head]
    this.head++
    return result

  }

  isEmpty() {
    return this.tail - this.head === 0
  }

  size() {
    return this.tail - this.head
  }

  peek() {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.head]
  }

  clear() {
    this.items = {}
    this.tail = 0
    this.head = 0
    return this.items
  }

  toString() {
    if (this.isEmpty()) {
      return ''
    }
    let string = `${this.items[this.head]}`
    for (let index = this.head + 1; index < this.tail; index++) {
      string = `${string},${this.items[index]}`
    }
    return string
  }

}

export default Queue
