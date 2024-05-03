export function toArray<T = any>(target: T): T extends any[] ? T : [T] {
  return Array.isArray(target) ? target : ([target] as any);
}
