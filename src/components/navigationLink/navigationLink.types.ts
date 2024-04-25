export interface NavigationLinkProps
  extends Omit<
    React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    "target" | "href"
  > {
  disabled?: boolean;
  to?: string;
}
