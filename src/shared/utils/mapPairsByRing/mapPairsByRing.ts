export function mapPairsByRing<T>(elements: T[], action: (a: T, b: T) => T) {
  return elements.map((a, i, elements) => {
    return action(a, i < elements.length - 1 ? elements[i + 1] : elements[0]);
  });
}
