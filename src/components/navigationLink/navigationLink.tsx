import { useNavigate } from "react-router-dom";
import { NavigationLinkProps } from "./navigationLink.types";

export const NavigationLink = ({
  onClick = undefined,
  to = undefined,
  disabled = false,
  ...props
}: NavigationLinkProps) => {
  const navigate = useNavigate();

  const onClickHandler = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (!event.ctrlKey && to !== undefined && !disabled) {
      event.preventDefault();
      navigate(to);
    }

    if (onClick !== undefined) {
      onClick(event);
    }
  };

  return (
    <a
      {...props}
      href={!disabled ?? to !== undefined ? to : undefined}
      onClick={onClickHandler}
    >
      {props.children}
    </a>
  );
};
