export type IHandle = {
  crumb: "string";
};

export function crumb(crumb: string) {
  return {
    crumb: crumb,
  } as IHandle;
}
