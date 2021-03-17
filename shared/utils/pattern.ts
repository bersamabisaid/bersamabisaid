export const createSingleton = function <T> (factoryFn: () => T) {
  let _singleton: T | undefined;

  if (_singleton === undefined) {
    _singleton = factoryFn();
  }

  return _singleton;
};
