import { HiArrowRightOnRectangle } from "react-icons/hi2";
import Button from "../../ui/Button";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

export default function Logout() {
  const { logout, isLoading } = useLogout();

  const handleLogoutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    logout();
  };

  return (
    <Button
      onClick={handleLogoutClick}
      disabled={isLoading}
      $variation="secondary"
    >
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </Button>
  );
}
