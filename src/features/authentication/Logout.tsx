import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
import { MouseEventHandler } from "react";

export default function Logout() {
  const { logout, isLoading } = useLogout();

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    logout();
  };

  return (
    <ButtonIcon onClick={handleClick} disabled={isLoading}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}
