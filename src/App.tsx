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
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [newList, setNewList] = useState<TodoItem[]>(taskList)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemId, setItemId] = useState("")
  const [title, setTitle] = useState("")
  const [itemForEdit, setItemForEdit] = useState<TodoItem[]>(taskList)
  const onCloseAddModalHandler = () => {
    setShowAddModal(false)
  }
  const onOpenAddModalHandler = () => {
    setShowAddModal(true)
  }
  const addNewTaskList = (param: TodoItem) => {
    setNewList([...newList, param])
    setShowAddModal(false)
  }

  const onCloseEditModalHandler = () => {
    setShowEditModal(false)
  }
  const onOpenEditModalHandler = (id: string) => {
    setShowEditModal(true)
    let editValue = newList.filter((f) => f.id == id)
    if (editValue) {
      setTitle(editValue[0].title)
      setItemForEdit(editValue)
    }
  }
  const editTaskList = (param: TodoItem) => {
    const updatedList = newList.map((task) => {
      if (task.id === param.id) {
        return {
          ...task,
          title: param.title,
          priority: param.priority,
        }
      }
      return task
    })
    setNewList(updatedList)
    setShowEditModal(false)
  }

  const onOpenDeleteModal = () => {
    setShowDeleteModal(true)
  }
  const onCloseDeleteModal = () => {
    setShowDeleteModal(false)
  }
  const deleteItem = () => {
    setNewList(newList.filter((f) => f.id != itemId))
    onCloseDeleteModal()
  }

  const showId = (id: string) => {
    setItemId(id)
  }

  const onTaskUpdated = (param: TodoItem) => {
    console.log(param)
    const updatedList = newList.map((task) => {
      if (task.id === param.id) {
        return {
          ...task,
          status: param.status,
          progress: param.progress,
        }
      }
      return task
    })
    setNewList(updatedList)
  }

  return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Task List</h2>
          <Button title="Add Task" icon={<Add />} onClick={onOpenAddModalHandler} />
        </div>
        <div className="task-container">
          {newList.map((task) => (
            <TaskCard
              onTaskUpdated={onTaskUpdated}
              key={task.id}
              openEditModal={(id: string) => onOpenEditModalHandler(id)}
              onIdSelected={showId}
              openDeleteModal={onOpenDeleteModal}
              task={task}
            />
          ))}
        </div>
      </div>
      {showAddModal && (
        <AddEditTaskForm
          inputValue={""}
          taskName={"Add Task"}
          buttonName={"Add"}
          addOrEditItem={addNewTaskList}
          onCloseModal={onCloseAddModalHandler}
        />
      )}
      {showDeleteModal && <DeleteModal deleteItem={deleteItem} closeModal={onCloseDeleteModal} />}
      {showEditModal && (
        <AddEditTaskForm
          obj={itemForEdit}
          inputValue={title}
          taskName={"Edit Task"}
          buttonName={"Edit"}
          addOrEditItem={editTaskList}
          onCloseModal={onCloseEditModalHandler}
        />
      )}
    </div>
  )
}

export default App
