import {
    ColorStyleState,
    colorStyleBgHandler,
} from '../../../helpers/colorStyleClassHandler'

type CreateCategoryButtonProps = {
    color: ColorStyleState
    action: () => void
}

const CreateCategoryButton = ({ color, action }: CreateCategoryButtonProps) => (
    <div>
        <button
            type="button"
            onClick={action}
            className={`text-white ${colorStyleBgHandler(
                color
            )} btn-circle transition-all active:scale-90`}
        >
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
        </button>
    </div>
)
export default CreateCategoryButton