import Button from "../Button"
import Modal from "../Modal"
import "./style.scss"

type PropsType = {
  closeModal: (param: boolean) => void
  deleteModal: () => void
}
const DeleteModal = (props: PropsType) => {
  return (
    <Modal>
      <div className="delete-modal">
        <p>Are you sure you want to delete this task?</p>
        <div className="delete-modal__actions">
          <Button
            title="Delete"
            onClick={() => {
              props.deleteModal()
            }}
          />
          <Button
            title="Cancel"
            outline
            onClick={() => {
              props.closeModal(false)
            }}
          />
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
