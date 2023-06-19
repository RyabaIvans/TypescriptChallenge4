import "./App.scss"
import { ReactComponent as Add } from "./assets/icons/add.svg"
import AddEditTaskForm from "./components/AddEditTaskForm"
import Button from "./components/Button"
import DeleteModal from "./components/DeleteModal"
import TaskCard from "./components/TaskCard"
import { taskList } from "./siteData/taskList"
import { useState } from "react"

export type TodoItem = {
  id: string
  title: string
  priority: "high" | "medium" | "low" | string
  status: "To Do" | "In Progress" | "Done"
  progress: number
}

const App = () => {
  const [showAddEditModal, setShowAddEditModal] = useState(false)
  const [newList, setNewList] = useState<TodoItem[]>(taskList)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteID, setDeleteId] = useState("")

  const handleButtonClick = (param: boolean) => {
    console.log("Кнопка нажата!", param) // Используем переданный параметр
    setShowAddEditModal(param)
  }

  const addNewTaskList = (param: TodoItem) => {
    setNewList([...newList, param])
    setShowAddEditModal(false)
    console.log(newList)
  }

  const openModal = () => {
    setShowDeleteModal(true)
  }

  const showId = (id: string) => {
    setDeleteId(id)
  }

  const deleteItem = () => {
    setNewList(newList.filter((f) => f.id != deleteID))
    closeModal()
  }

  const closeModal = () => {
    setShowDeleteModal(false)
  }

  return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Task List</h2>
          <Button
            title="Add Task"
            icon={<Add />}
            onClick={() => {
              setShowAddEditModal(true)
            }}
          />
        </div>
        <div className="task-container">
          {newList.map((task) => (
            <TaskCard onIdSelected={showId} openModal={openModal} task={task} />
          ))}
        </div>
      </div>
      {showAddEditModal && <AddEditTaskForm taskObj={addNewTaskList} onButtonClick={handleButtonClick} />}
      {showDeleteModal && <DeleteModal deleteModal={deleteItem} closeModal={closeModal} />}
    </div>
  )
}

export default App
