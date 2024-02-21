import { useState } from "react";
import Modal from "../../ui/Modal.tsx";
import Button from "../../ui/Button.tsx";
import CreateCabinForm from "./CreateCabinForm.tsx";

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpenModal(!isOpenModal)}>Add Cabin</Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          {<CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />}
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
