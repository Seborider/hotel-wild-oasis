import styled from "styled-components";
import { useDeleteCabin } from "./useDeleteCabin.ts";
import { formatCurrency } from "../../utils/helpers.ts";
import CreateCabinForm from "./CreateCabinForm.tsx";
import { CabinType } from "../../interfaces.ts";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCabinMutation } from "./useCabinMutation.ts";
import { createCabin } from "../../services/apiCabins.ts";
import Modal from "../../ui/Modal.tsx";
import ConfirmDelete from "../../ui/ConfirmDelete.tsx";
import Table from "../../ui/Table.tsx";
import Menus from "../../ui/Menus.tsx";

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

interface CabinRowProps {
  cabin: CabinType;
}

function CabinRow({ cabin }: CabinRowProps) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { mutate } = useCabinMutation({ operation: createCabin });

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
    } as CabinType);
  }

  return (
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
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId!} />

            <Menus.List id={cabinId!}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleDuplicateCabin}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resource="cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId!)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
