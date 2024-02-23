import styled from "styled-components";
import { useDeleteCabin } from "./useDeleteCabin.ts";
import { formatCurrency } from "../../utils/helpers.ts";
import Button from "../../ui/Button.tsx";
import CreateCabinForm from "./CreateCabinForm.tsx";
import { CabinType } from "../../interfaces.ts";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCabinMutation } from "./useCabinMutation.ts";
import { createCabin } from "../../services/apiCabins.ts";
import Modal from "../../ui/Modal.tsx";
import ConfirmDelete from "../../ui/ConfirmDelete.tsx";
import Table from "../../ui/Table.tsx";

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
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isSubmitting, mutate } = useCabinMutation({ operation: createCabin });

  const {
    image,
    discount,
    name,
    maxCapacity,
    regularPrice,
    id: cabinId,
    description,
  } = cabin;

  function handleDuplicateCabin() {
    mutate({
      name: `Copy of ${name}`,
      image,
      discount,
      description,
      regularPrice,
      maxCapacity,
    });
  }

  return (
    <>
      <Table.Row>
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
            onClick={handleDuplicateCabin}
            size="small"
            variation="secondary"
            disabled={isSubmitting}
          >
            <HiSquare2Stack />
          </Button>

          <Modal>
            <Modal.Open opens="edit">
              <Button size="small" variation="secondary">
                <HiPencil />
              </Button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.Open opens="delete">
              <Button size="small" variation="danger">
                <HiTrash />
              </Button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                resource="cabin"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(Number(cabinId))}
              />
            </Modal.Window>
          </Modal>
        </ButtonRow>
      </Table.Row>
    </>
  );
}

export default CabinRow;
