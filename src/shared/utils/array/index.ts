export const createArray = (size: number) => {
  return Array.from(Array(size).keys());
};

export function groupBy<T>(elements: T[], key: keyof T) {
  return elements.reduce(function (prev: any, currentValue: T) {
    (prev[currentValue[key]] = prev[currentValue[key]] || []).push(
      currentValue
    );
    return prev;
  }, {});
}
