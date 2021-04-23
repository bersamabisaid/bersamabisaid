interface QueueConstructorOption<T> {
  maxSize: number;
  initialValue?: T[];
}

export class Queue<T> {
  #value: T[] = [];

  maxSize: number;

  constructor({ maxSize, initialValue = [] }: QueueConstructorOption<T>) {
    this.maxSize = maxSize;
    initialValue.forEach((data) => this.append(data));
  }

  append(data: T) {
    if (this.#value.length >= this.maxSize) {
      this.#value.shift();
    }

    this.#value.push(data);
  }

  pop() {
    this.#value.pop();
  }

  get() {
    return this.#value;
  }
}
