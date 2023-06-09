/* eslint-disable react/display-name */
import { memo, useMemo } from 'react'
import iconList from '../../../Helpers/iconList'
import { IconType } from '../../../types/types'

const IconPicker = memo(
    ({
        newCategoryIcon,
        changeCategoryIconHandler,
    }: IconPickerProps): JSX.Element => {
        return (
            <div className="flex-none collapse max-h-60 rounded-3xl">
                <input type="checkbox" className="peer " />
                <SelectedIcon iconName={newCategoryIcon} />
                <div className="relative p-0 m-0 overflow-auto collapse-content place-items-center accent-slate-700">
                    <div className="flex flex-wrap justify-center mt-3 ">
                        <Icons
                            changeCategoryIconHandler={
                                changeCategoryIconHandler
                            }
                        />
                    </div>
                </div>
            </div>
        )
    }
)

const Icons = memo(({ changeCategoryIconHandler }: IconsProps): JSX.Element => {
    const memoizedIcons = useMemo(() => {
        const defaultIcons = [
            'IoDocuments',
            'IoHeart',
            'IoPulse',
            'IoLaptop',
            'IoSchool',
            'IoListOutline',
        ]
        return Object.entries(iconList).filter(([name]) => {
            return !defaultIcons.includes(name)
        })
    }, [])

    return (
        <>
            {memoizedIcons.map(([name, Icon]) => (
                <button
                    className="px-3 text-5xl transition-all ease-in-out text-slate-600 hover:opacity-75 focus:scale-125"
                    type="button"
                    key={name}
                    onClick={() => changeCategoryIconHandler(name)}
                >
                    <Icon />
                </button>
            ))}
        </>
    )
})

const SelectedIcon = ({ iconName }: IconProps): JSX.Element => (
    <button
        className="self-center p-0 m-0 text-5xl transition duration-300 ease-in-out bounced flash text-slate-600 collapse-title peer-checked:scale-75 peer-checked:overflow-scroll"
        type="button"
    >
        <DynamicIcon iconName={iconName} />
    </button>
)

export const DynamicIcon = ({ iconName }: IconProps): JSX.Element => {
    const Icon = iconList[iconName]

    if (!Icon) {
        const DefaultIcon = iconList.IoHappy
        if (DefaultIcon) {
            return <DefaultIcon />
        }
        throw new Error('Default icon not found')
    }
    return <Icon />
}

export default memo(IconPicker)

type IconPickerProps = {
    newCategoryIcon: IconType
    changeCategoryIconHandler: (categoryIcon: IconType) => void
}

type IconProps = {
    iconName: IconType
}

type IconsProps = {
    changeCategoryIconHandler: (iconName: IconType) => void
}
