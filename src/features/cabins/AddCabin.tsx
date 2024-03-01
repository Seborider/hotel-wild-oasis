import Modal from '../../ui/Modal.tsx'
import Button from '../../ui/Button.tsx'
import CreateCabinForm from './CreateCabinForm.tsx'

function AddCabin() {
    return (
        <div>
            <Modal>
                <Modal.Open opens="cabin-form">
                    <Button>Add new Cabin</Button>
                </Modal.Open>
                <Modal.Window name="cabin-form">
                    <CreateCabinForm />
                </Modal.Window>
            </Modal>
        </div>
    )
}

export default AddCabin
