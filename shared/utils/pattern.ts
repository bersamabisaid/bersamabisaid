export const createSingleton = function <T> (factoryFn: () => T) {
  let _singleton: T | undefined;

  return () => {
    if (_singleton === undefined) {
      _singleton = factoryFn();
    }

    return _singleton;
  };
};
