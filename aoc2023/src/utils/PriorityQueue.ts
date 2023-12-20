class PriorityQueue<T> {
  private heap: T[] = [];
  private readonly compare: (a: T, b: T) => number;

  constructor(compare: (a: T, b: T) => number) {
    this.compare = compare;
  }

  enqueue(element: T): void {
    this.heap.push(element);
    this.bubbleUp();
  }

  dequeue(): T | undefined {
    const root = this.heap[0];
    const lastElement = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = lastElement as T;
      this.bubbleDown();
    }

    return root;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  private bubbleUp(): void {
    let current = this.heap.length - 1;

    while (current > 0) {
      const parent = Math.floor((current - 1) / 2);

      if (this.compare(this.heap[current], this.heap[parent]) >= 0) break;

      [this.heap[current], this.heap[parent]] = [this.heap[parent], this.heap[current]];
      current = parent;
    }
  }

  private bubbleDown(): void {
    let current = 0;

    while (true) {
      const leftChild = 2 * current + 1;
      const rightChild = 2 * current + 2;
      let smallest = current;

      if (leftChild < this.heap.length && this.compare(this.heap[leftChild], this.heap[smallest]) < 0) {
        smallest = leftChild;
      }

      if (rightChild < this.heap.length && this.compare(this.heap[rightChild], this.heap[smallest]) < 0) {
        smallest = rightChild;
      }

      if (smallest === current) break;

      [this.heap[current], this.heap[smallest]] = [this.heap[smallest], this.heap[current]];
      current = smallest;
    }
  }
}

export default PriorityQueue
