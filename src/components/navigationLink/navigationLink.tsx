import { useNavigate } from "react-router-dom";
import { NavigationLinkProps } from "./navigationLink.types";

export const NavigationLink = ({
  onClick = undefined,
  to = undefined,
  disabled = false,
  navigate = true,
  ...props
}: NavigationLinkProps) => {
  const _navigate = useNavigate();

  const onClickHandler = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (!event.ctrlKey && to !== undefined && !disabled && navigate) {
      event.preventDefault();
      _navigate(to);
    }

    if (onClick !== undefined) {
      onClick(event);
    }
  };

  const isHref = !disabled && to !== undefined && navigate;

  return (
    <a
      {...props}
      href={isHref ? to : undefined}
      onClick={onClickHandler}
    >
      {props.children}
    </a>
  );
};
