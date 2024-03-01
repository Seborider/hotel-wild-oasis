import styled from "styled-components";
import Button from "./Button";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Logout from "../features/authentication/Logout";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 1rem;
`;

export default function HeaderMenu() {
  const navigate = useNavigate();

  const handleNavigationClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    navigate("/account");
  };

  return (
    <StyledHeaderMenu>
      <li>
        <Button $variation="secondary" onClick={handleNavigationClick}>
          <HiOutlineUser />
        </Button>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}
