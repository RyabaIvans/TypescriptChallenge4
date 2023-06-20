import { ReactComponent as Close } from "../../assets/icons/close.svg"
import Button from "../Button"
import Input from "../Input"
import Modal from "../Modal"
import "./style.scss"
import { ChangeEvent, useState } from "react"
import { TodoItem } from "../../App"
import { v4 as uuidv4 } from "uuid"

type PropsType = {
  addOrEditItem: (obj: TodoItem) => void
  onCloseModal: () => void
  taskName: string
  buttonName: string
  inputValue: string
  obj?: object
}
const AddEditTaskForm = (props: PropsType) => {
  const [inputValue, setInputValue] = useState(props.inputValue)
  const [inputPriority, setInputPriority] = useState<"high" | "medium" | "low">("low")
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null)

  let myObj: TodoItem[] | undefined = props.obj as TodoItem[]

  const onModalClose = () => {
    props.onCloseModal() // Передаем параметр `false` в функцию
  }
  const onChangeInput = (param: ChangeEvent<HTMLInputElement>) => {
    setInputValue(param.target.value)
  }
  const onChangePriority = (param: "high" | "medium" | "low") => {
    setInputPriority(param)
  }
  const onAddItemHandler = () => {
    if (props.taskName === "Edit Task") {
      if (myObj) {
        const newItem = {
          id: myObj && myObj[0].id,
          title: inputValue,
          priority: inputPriority,
          status: myObj && myObj[0].status,
          progress: myObj && myObj[0].progress,
        }
        props.addOrEditItem(newItem)
        console.log("edit")
      }
    } else {
      const newItem: TodoItem = {
        id: uuidv4(),
        title: inputValue,
        priority: inputPriority,
        status: "To Do",
        progress: 0,
      }
      console.log("add")
      props.addOrEditItem(newItem)
    }
  }
  const onPriorityChange = (priority: string) => {
    setSelectedPriority(priority === selectedPriority ? null : priority)
    onChangePriority(priority as "high" | "medium" | "low")
  }
  const priorityClass = (priority: string) => {
    return selectedPriority === priority ? `${priority}-selected` : priority
  }

  const disabledButton = () => inputValue == ""

  return (
    <Modal>
      <form>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title">{props.taskName} </span>
            <Close onClick={onModalClose} className="cp" />
          </div>
          <Input
            label="Task"
            placeholder="Type your task here..."
            onChange={(event) => onChangeInput(event)}
            name="title"
            value={inputValue}
          />
          <div className="modal-priority">
            <span>Priority</span>
            <ul className="priority-buttons">
              {["high", "medium", "low"].map((priority: string) => (
                <li key={priority} onClick={() => onPriorityChange(priority)} className={priorityClass(priority)}>
                  {priority}
                </li>
              ))}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button
              title={props.buttonName}
              disabled={disabledButton()}
              onClick={() => {
                onAddItemHandler()
              }}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AddEditTaskForm
