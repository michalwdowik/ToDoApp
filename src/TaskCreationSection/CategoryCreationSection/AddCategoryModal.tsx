/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { CirclePicker, ColorResult } from 'react-color'
import { v4 as uuid } from 'uuid'
import { createPortal } from 'react-dom'
import IconPicker from './IconPicker'
import {
    colorStyleBgHandler,
    colorPickerColorHandler,
} from '../../colorStyleClassHandler'
import Button from '../../Components/Button'
import Alert from '../../Components/Alert'
import { useCategoryContext } from '../../Contexts/CategoryContext'

type AlertType = {
    title: string
    type: string
    background: string
    isShowed: boolean
}

type NewCategory = {
    name: string
    colorStyle: string
    color: string
    icon: string
    isAddedByUser: boolean
}

export default function AddCategoryModal() {
    const { categories, addCategory } = useCategoryContext()

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.code === 'Escape') {
                const checkbox = document.getElementById(
                    'my-modal-3'
                ) as HTMLInputElement | null
                if (checkbox) {
                    checkbox.checked = false
                }
            }
        }
        document.addEventListener('keydown', handleEscapeKey)
        return () => {
            document.removeEventListener('keydown', handleEscapeKey)
        }
    }, [])

    const [isCorrectTyped, setIsCorrectTyped] = useState(true)
    const portal = document.getElementById('portal')
    const [alert, setAlert] = useState({})
    const [searchIconInput, setSearchIconInput] = useState('')
    const defaultCategoryParams: NewCategory = {
        name: '',
        colorStyle: 'info',
        color: '#38bdf8',
        icon: 'IoIosHappy',
        isAddedByUser: true,
    }
    const [newCategory, setNewCategory] = useState(defaultCategoryParams)
    const inputRef = useRef<HTMLInputElement>(null)
    const maxCategoriesReached = categories.length >= 12

    const onInput = (e: ChangeEvent<HTMLInputElement>) => {
        setIsCorrectTyped(e.target.value !== '')
    }

    const showAlert = (alertData: AlertType) => {
        setAlert({
            title: alertData.title,
            type: alertData.type,
            background: alertData.background,
            isShowed: alertData.isShowed,
        })
        setTimeout(() => {
            setAlert({ isShowed: false })
        }, 3000)
    }

    const createNewCategory = () => {
        if (maxCategoriesReached) {
            showAlert({
                title: 'You can create up to 7 different categories',
                type: 'error',
                background: 'bg-error',
                isShowed: true,
            })
            return
        }
        const isCategoryValid =
            inputRef.current?.value &&
            !categories.some(({ name }) => inputRef.current!.value === name)

        if (!isCategoryValid) {
            setIsCorrectTyped(false)
            showAlert({
                title: "You can't create a category with this name, try again!",
                type: 'error',
                background: 'bg-error',
                isShowed: true,
            })
            return
        }

        addCategory({
            ...newCategory,
            name: inputRef.current.value,
            uuid: uuid(),
        })

        showAlert({
            title: 'New category has been added!',
            type: 'success',
            background: 'bg-success',
            isShowed: true,
        })
        inputRef.current.value = ''
        setSearchIconInput('')
        setNewCategory(defaultCategoryParams)
    }

    const changeColorHandler = (color: ColorResult) => {
        setNewCategory({
            ...newCategory,
            colorStyle: colorPickerColorHandler(color),
            color: color.hex,
        })
    }

    const changeCategoryIconHandler = (icon: string) => {
        setNewCategory({ ...newCategory, icon })
    }

    return (
        <div>
            <OpenModalButton />
            {createPortal(
                <div>
                    <input
                        type="checkbox"
                        id="my-modal-3"
                        className="modal-toggle "
                    />
                    <label
                        htmlFor="my-modal-3"
                        className="cursor-pointer modal"
                    >
                        <label className="flex flex-col content-center justify-center gap-3 p-5 pt-10 mt-5 modal-box rounded-3xl bg-slate-100">
                            <div className="indicator">
                                <NewCategoryInput
                                    maxChars={17}
                                    inputRef={inputRef}
                                    onInput={onInput}
                                    isInputCorrect={isCorrectTyped}
                                />
                                <CreateNewTaskButton
                                    color={newCategory.colorStyle}
                                    action={createNewCategory}
                                />
                            </div>
                            <ColorPicker
                                action={changeColorHandler}
                                color={newCategory.color}
                            />
                            <IconPicker
                                setSearchIconInput={setSearchIconInput}
                                searchIconInput={searchIconInput}
                                newCategoryIcon={newCategory.icon}
                                setNewCategoryIcon={(categoryIcon: string) =>
                                    changeCategoryIconHandler(categoryIcon)
                                }
                            />
                        </label>
                    </label>
                </div>,
                portal!
            )}
            <Alert alert={alert} />
        </div>
    )
}

type NewCategoryInputProps = {
    maxChars: number
    onInput: (e: ChangeEvent<HTMLInputElement>) => void
    isInputCorrect: boolean
    inputRef: React.RefObject<HTMLInputElement>
}

const NewCategoryInput = ({
    maxChars,
    onInput,
    isInputCorrect,
    inputRef,
}: NewCategoryInputProps) => {
    const inputBorderColor = () => {
        return isInputCorrect ? 'input focus:input' : 'input-error'
    }
    return (
        <input
            ref={inputRef}
            maxLength={maxChars}
            onInput={onInput}
            type="text"
            placeholder="Type here..."
            id="taskInput"
            className={`input mb-5 mr-5 w-full max-w-xs input-bordered ${inputBorderColor}`}
        />
    )
}

const OpenModalButton = () => {
    return (
        <label
            htmlFor="my-modal-3"
            className="p-1 m-0 font-normal bg-transparent border-0 dark:bg:transparent btn-xs btn text-slate-700 hover:scale-110 hover:bg-transparent"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 96 960 960"
                width="24"
            >
                <path
                    fill="#6366f1"
                    d="M440 856V616H200v-80h240V296h80v240h240v80H520v240h-80Z"
                />
            </svg>
            add
        </label>
    )
}

type CreateNewTaskButtonProps = {
    color: string
    action: () => void
}

const CreateNewTaskButton = ({ color, action }: CreateNewTaskButtonProps) => {
    return (
        <Button
            action={action}
            className={`text-white ${colorStyleBgHandler(
                color
            )} btn-circle transition-all active:scale-90`}
            title={
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
            }
        />
    )
}

type ColorPickerProps = {
    action: (color: ColorResult) => void
    color: string
}

const ColorPicker = ({ color, action }: ColorPickerProps) => (
    <CirclePicker
        className="self-center p-0 m-0"
        color={color}
        colors={['#38bdf8', '#f87171', '#10b981', '#7e22ce', '#eab308']}
        onChangeComplete={action}
    />
)