/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent, useContext } from 'react'
import { v4 as uuid } from 'uuid'
import TaskModal from './TaskModal/TaskModal'
import TaskViewSectionContext from '../Contexts/TaskViewSectionContext'
import { StarType, TaskType } from '../types/types'
import {
    ColorStyleState,
    colorStyleCheckboxHandler,
} from '../Helpers/colorStyleClassHandler'

const Task = ({ task, updateTaskStatus, searchInput }: TaskProps) => {
    const { selectedCategoryTab } = useContext(TaskViewSectionContext)
    const correctCategory =
        selectedCategoryTab === 'all' || task.category === selectedCategoryTab
    const correctName =
        !searchInput ||
        task.name.toLowerCase().includes(searchInput.toLowerCase())
    const shouldDisplay = correctCategory && correctName

    return shouldDisplay ? (
        <label>
            <li className="py-1 mx-3 border-b border-solid border-slate-200 sm:py-3">
                <div className="flex items-center space-x-4 ">
                    <TaskCheckbox
                        isTaskDone={task.done}
                        taskColorStyle={task.colorStyle}
                        updateTaskStatus={updateTaskStatus}
                    />
                    <TaskDescription
                        taskName={task.name}
                        taskCategory={task.category}
                    />
                    <TaskModalImportance taskRate={task.rate} />
                    <TaskModal task={task} />
                </div>
            </li>
        </label>
    ) : null
}
export default Task

const TaskCheckbox = ({
    isTaskDone,
    taskColorStyle,
    updateTaskStatus,
}: TaskCheckBoxProps) => {
    return (
        <input
            className={`${colorStyleCheckboxHandler(taskColorStyle)} checkbox `}
            id={uuid()}
            type="checkbox"
            onChange={updateTaskStatus}
            checked={isTaskDone}
        />
    )
}

const TaskDescription = ({ taskName, taskCategory }: TaskDescriptionProps) => {
    return (
        <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate transition transition-delay-50 text-slate-700 hover:text-gray-400">
                {taskName}
            </p>
            <p className="text-sm text-gray-500 truncate ">{taskCategory}</p>
        </div>
    )
}

const TaskModalImportance = ({ taskRate }: TaskModalImportanceProps) => {
    return (
        <div className="inline-flex items-center text-base font-semibold text-slate-700 ">
            {[...Array(taskRate)].map(() => (
                <span key={uuid()}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
            ))}
        </div>
    )
}

type TaskModalImportanceProps = Pick<StarType, 'taskRate'>

type TaskCheckBoxProps = {
    isTaskDone: boolean
    taskColorStyle: ColorStyleState
    updateTaskStatus: (e: ChangeEvent<HTMLInputElement>) => void
}

type TaskDescriptionProps = {
    taskName: string
    taskCategory: string
}

export type TaskProps = {
    task: TaskType
    updateTaskStatus: (e: ChangeEvent<HTMLInputElement>) => void
    searchInput: string
}
