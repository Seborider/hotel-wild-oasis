import styled, { css } from "styled-components";
import React from "react";

interface StyledFormRow {
  orientation: string;
}

interface FormRowProps {
  label?: string;
  error?: string;
  children?: React.ReactNode;
  orientation?: string;
  disabled?: boolean;
}

const StyledFormRow = styled.div<StyledFormRow>`
  display: grid;
  align-items: center;
  grid-template-columns: ${(props) =>
    props.orientation === "vertical" ? "1fr" : "24rem 1fr 1.2fr"};
  gap: ${(props) => (props.orientation === "vertical" ? "0.8rem" : "2.4rem")};
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: ${(props) =>
      props.orientation === "vertical"
        ? "none"
        : "1px solid var(--color-grey-100)"};
  }

  /* Special treatment if the row contains buttons, and if it's NOT a vertical row */
  ${(props) =>
    props.orientation !== "vertical" &&
    css`
      &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
      }
    `}
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({
  label,
  error,
  children,
  orientation,
  id,
}: FormRowProps & { id?: string }) {
  return (
    <StyledFormRow orientation={orientation!}>
      {label && id && <Label htmlFor={id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
