import classNames from "classnames"
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg"
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg"
import CircularProgressBar from "../CircularProgressBar"
import "./style.scss"

type Task = {
  id: string
  title: string
  priority: string
  status: string
  progress: number
}

type TaskCardProps = {
  task: Task
  onIdSelected: (id: string) => void
  openDeleteModal: () => void
  openEditModal: (id: string) => void
  onTaskUpdated: (obj: any) => void
}

const TaskCard = ({ task, openDeleteModal, openEditModal, onIdSelected, onTaskUpdated }: TaskCardProps) => {
  const { id, title, priority, status, progress } = task
  const onDeleteHandler = () => {
    openDeleteModal()
    onIdSelected(id)
  }
  const onEditHandler = (id: string) => {
    openEditModal(id)
  }

  const getNextStatus = (currentStatus: string): string => {
    switch (currentStatus) {
      case "To Do":
        return "In Progress"
      case "In Progress":
        return "Done"
      case "Done":
        return "To Do"
      default:
        return "To Do"
    }
  }
  const getNextProgress = (status: string): number => {
    switch (status) {
      case "To Do":
        return 50
      case "In Progress":
        return 100
      case "Done":
        return 0
      default:
        return 0 // Значение по умолчанию для неизвестного статуса
    }
  }
  const onStatusChangeHandler = () => {
    const newStatus = getNextStatus(status) // Получаем следующий статус задачи
    const newProgress = getNextProgress(status)
    const updatedTask = { ...task, status: newStatus, progress: newProgress } // Создаем обновленный объект задачи
    onTaskUpdated(updatedTask) // Вызываем функцию обновления задачи в родительском компоненте или контексте
  }

  return (
    <div className="task-card">
      <div className="flex w-100">
        <span className="task-title">Task</span>
        <span className="task">{title}</span>
      </div>
      <div className="flex">
        <span className="priority-title">Priority</span>
        <span className={classNames(`${priority}-priority`, "priority")}>{priority}</span>
      </div>
      <div className="task-status-wrapper">
        <button className="status" onClick={onStatusChangeHandler}>
          {status}
        </button>
      </div>
      <div className="progress">
        <CircularProgressBar strokeWidth={2} sqSize={24} percentage={progress} />
      </div>
      <div className="actions">
        <EditIcon onClick={() => onEditHandler(task.id)} className="mr-20 cp" />
        <DeleteIcon onClick={onDeleteHandler} className="cp" />
      </div>
    </div>
  )
}

export default TaskCard
