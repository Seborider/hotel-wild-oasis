import styled from "styled-components";
import Button from "./Button.js";
import Heading from "./Heading";

interface ConfirmDeleteProps {
  resource?: string;
  onConfirm: () => void;
  disabled?: boolean;
  onCloseModal?: () => void;
}

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({
  resource,
  onConfirm,
  disabled,
  onCloseModal,
}: ConfirmDeleteProps) {
  return (
    <StyledConfirmDelete>
      <Heading type="h3">Delete {resource}</Heading>
      <p>
        Are you sure you want to delete this {resource} permanently? This action
        cannot be undone.
      </p>

      <div>
        <Button variation="secondary" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variation="danger" onClick={onConfirm} disabled={disabled}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
