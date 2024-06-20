export type IHandle = {
  crumb: string;
  disabled: boolean
};

export function crumb(crumb: string, disabled = false) {
  return {
    crumb: crumb,
    disabled: disabled
  } as IHandle;
}
