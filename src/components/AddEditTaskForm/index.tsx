import classNames from "classnames"
import { ReactComponent as Close } from "../../assets/icons/close.svg"
import Button from "../Button"
import Input from "../Input"
import Modal from "../Modal"
import "./style.scss"
import { ChangeEvent, useState } from "react"
import { TodoItem } from "../../App"
import { v4 as uuidv4 } from "uuid"

type PropsType = {
  taskObj: (obj: TodoItem) => void
  onButtonClick: (param: boolean) => void
}
const AddEditTaskForm = (props: PropsType) => {
  const handleClick = () => {
    props.onButtonClick(false) // Передаем параметр `false` в функцию
  }

  const onChangeInput = (param: ChangeEvent<HTMLInputElement>) => {
    setInputValue(param.target.value)
  }
  const onChangePriority = (param: "high" | "medium" | "low") => {
    setInputPriority(param)
  }

  const onAddClickButton = () => {
    const newItem: TodoItem = {
      id: uuidv4(),
      title: inputValue,
      priority: inputPriority,
      status: "To Do",
      progress: 0,
    }
    props.taskObj(newItem)
  }

  const [inputValue, setInputValue] = useState("")
  const [inputPriority, setInputPriority] = useState<"high" | "medium" | "low">("low")

  const [selectedPriority, setSelectedPriority] = useState<string | null>(null)

  const handleClicks = (priority: string) => {
    setSelectedPriority(priority === selectedPriority ? null : priority)
    onChangePriority(priority as "high" | "medium" | "low")
  }

  const priorityClass = (priority: string) => {
    return selectedPriority === priority ? `${priority}-selected` : priority
  }

  return (
    <Modal>
      <form>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title">Add Task </span>
            <Close onClick={handleClick} className="cp" />
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
                <li key={priority} onClick={() => handleClicks(priority)} className={priorityClass(priority)}>
                  {priority}
                </li>
              ))}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button
              title="Add"
              onClick={(event) => {
                onAddClickButton()
              }}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AddEditTaskForm
