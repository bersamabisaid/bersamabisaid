export const createSingleton = function <T> (factoryFn: () => T) {
  let _singleton: T | undefined;

  return () => {
    if (_singleton === undefined) {
      _singleton = factoryFn();
    }

    return _singleton;
  };
};

export class Singleton<T> {
  #factoryFn: () => T;

  #value: T | undefined;

  constructor(factoryFn: () => T) {
    this.#factoryFn = factoryFn;
  }

  get value(): T {
    if (this.#value === undefined) {
      this.#value = this.#factoryFn();
    }

    return this.#value;
  }
}
