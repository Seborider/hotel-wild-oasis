import { useState } from "react";
import styled from "styled-components";
import { useDeleteCabin } from "./useDeleteCabin.ts";
import { formatCurrency } from "../../utils/helpers.ts";
import Button from "../../ui/Button.tsx";
import CreateCabinForm from "./CreateCabinForm.tsx";
import { CabinType } from "../../interfaces.ts";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;

  /* transform: scale(1.66666) translateX(-2px); */
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: Sono;
`;

const Price = styled.div`
  font-family: Sono, serif;
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: Sono, serif;
  font-weight: 500;
  color: var(--color-green-700);
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

interface CabinRowProps {
  cabin: CabinType;
}

function CabinRow({ cabin }: CabinRowProps) {
  const [showEditForm, setShowEditForm] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const {
    image,
    discount,
    name,
    maxCapacity,
    regularPrice,
    id: cabinId,
  } = cabin;

  return (
    <>
      <TableRow>
        <Img src={String(image)} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(Number(regularPrice))}</Price>
        {discount ? (
          <Discount>{formatCurrency(Number(discount))}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <ButtonRow>
          <Button
            onClick={() => setShowEditForm(!showEditForm)}
            size="small"
            variation="secondary"
          >
            Edit
          </Button>

          <Button
            size="small"
            variation="danger"
            onClick={() => deleteCabin(Number(cabinId))}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </ButtonRow>
      </TableRow>
      {showEditForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
