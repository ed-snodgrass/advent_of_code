export class Deque<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  addFront(element: T) {
    this.items.unshift(element);
  }

  addRear(element: T) {
    this.items.push(element);
  }

  removeFront(): T | undefined {
    return this.items.shift();
  }

  removeRear(): T | undefined {
    return this.items.pop();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }

  toString(): string {
    return this.items.toString();
  }
}
