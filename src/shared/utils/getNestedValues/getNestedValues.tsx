export function getNestedValue(fields: any, keys: string) {
  const fieldKeys = keys.split(".");
  let current: any = fields;
  fieldKeys.forEach((key) => {
    if (current[key] === undefined) {
      return undefined;
    }
    current = current[key];
  });
  return current;
}
