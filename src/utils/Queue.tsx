class INode<T> {
  value: T;
  next: INode<T> | null;

  constructor(value: T, next: INode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}
export default class Queue<T> {
  private head: INode<T> | null;
  private tail: INode<T> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(value: T) {
    const newNode = new INode<T>(value);
    if (this.tail) {
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  dequeue() {
    const currentHead = this.head;
    if (!currentHead) return;

    this.head = currentHead.next;
    this.size--;

    return currentHead.value;
  }

  get _size() {
    return this.size;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // 生成器函数，将Queue变为可迭代的
  *[Symbol.iterator]() {
    let current = this.head;

    while (current) {
      yield current.value;
      current = current.next;
    }
  }
}
