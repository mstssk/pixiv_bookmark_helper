export function promisify(original: (callback: () => void) => void) {
  if (typeof original !== "function") {
    throw new TypeError(`${original} is not function.`);
  }
  return function () {
    return new Promise<void>((resolve) => {
      original(() => {
        resolve();
      });
    });
  };
}
