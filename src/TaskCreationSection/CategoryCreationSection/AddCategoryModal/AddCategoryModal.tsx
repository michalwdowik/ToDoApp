/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { ColorResult } from 'react-color'
import { colorPickerColorHandler } from '../../../Helpers/colorStyleClassHandler'
import Alert, {
    AlertVariant,
    showAlert,
    useAlertState,
} from '../../../Components/Alert'
import {
    useCategoryContext,
    defaultCategoryParams,
} from '../../../Contexts/CategoryContext'
import Portal from '../../../Components/Portal'
import useCloseOnEscapeKey from '../../../Helpers/useCloseOnEscapeKey'
import useModalLogic from '../../../Helpers/useModalLogic'
import CreateNewTaskButton from './CreateNewTaskButton'
import NewCategoryInput from './NewCategoryInput'
import OpenModalButton from './OpenModalButton'
import ColorPicker from './ColorPicker'
import IconPicker from './IconPicker'

const AddCategoryModal = () => {
    const { categories, addCategory } = useCategoryContext()
    const { showModal, openModal, closeModal } = useModalLogic()
    const [isCorrectTyped, setIsCorrectTyped] = useState(true)
    const { alertState, setAlertState } = useAlertState()
    const [newCategory, setNewCategory] = useState(defaultCategoryParams)
    const inputRef = useRef<HTMLInputElement>(null)
    const maxCategoriesReached = categories.length >= 12
    useCloseOnEscapeKey({ id: 'addCategoryModal', closeModal })

    const onInput = (e: ChangeEvent<HTMLInputElement>) => {
        setIsCorrectTyped(e.target.value !== '')
    }
    const resetInput = () => {
        if (inputRef.current) inputRef.current.value = ''
    }

    const resetNewCategorySettings = () => {
        resetInput()
        setNewCategory(defaultCategoryParams)
    }

    const createNewCategory = () => {
        const hasValidName = inputRef.current?.value
        const isUnique = !categories.some(
            ({ name }) => inputRef.current?.value === name
        )
        const isCategoryValid = hasValidName && isUnique

        if (maxCategoriesReached) {
            showAlert(AlertVariant.ERROR_UP_TO_7_CATEGORIES, setAlertState)
            return
        }

        if (!isCategoryValid) {
            setIsCorrectTyped(false)
            showAlert(AlertVariant.ERROR_WRONG_NAME, setAlertState)
            return
        }

        addCategory({
            ...newCategory,
            name: inputRef.current.value,
            uuid: uuid(),
        })
        resetNewCategorySettings()
        closeModal()
        showAlert(AlertVariant.SUCCESS_NEW_CATEGORY_ADDED, setAlertState)
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
            <OpenModalButton openModal={openModal} />
            {showModal && (
                <Portal rootId="portal">
                    <div>
                        <input
                            type="checkbox"
                            id="addCategoryModal"
                            className="modal-toggle"
                        />
                        <label
                            htmlFor="addCategoryModal"
                            className="backdrop-blur-md modal"
                            onClick={closeModal}
                        >
                            <label
                                className="flex flex-col content-center justify-center gap-3 p-5 pt-10 mt-5 modal-box rounded-3xl bg-slate-100"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="indicator">
                                    <NewCategoryInput
                                        maxChars={17}
                                        inputRef={inputRef}
                                        onInput={onInput}
                                        isInputCorrect={isCorrectTyped}
                                        createNewCategory={createNewCategory}
                                    />
                                    <CreateNewTaskButton
                                        color={newCategory.colorStyle}
                                        action={createNewCategory}
                                    />
                                </div>
                                <ColorPicker
                                    changeColorHandler={changeColorHandler}
                                    color={newCategory.color}
                                />

                                <IconPicker
                                    newCategoryIcon={newCategory.icon}
                                    setNewCategoryIcon={(
                                        categoryIcon: string
                                    ) =>
                                        changeCategoryIconHandler(categoryIcon)
                                    }
                                />
                            </label>
                        </label>
                    </div>
                </Portal>
            )}
            <Alert alert={alertState} />
        </div>
    )
}
export default AddCategoryModal