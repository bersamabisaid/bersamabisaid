type Unpromisify<T> = T extends PromiseLike<infer R> ? R : T;

export {
  Unpromisify,
};
