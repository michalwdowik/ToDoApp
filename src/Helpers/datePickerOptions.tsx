const options = {
    title: 'Select Deadline',
    autoHide: false,
    todayBtn: true,
    clearBtn: false,
    maxDate: new Date('2030-01-01'),
    minDate: new Date('2000-01-01'),
    theme: {
        background: 'dark:bg-base-300 rounded-3xl m-0 overflow-auto',
        todayBtn:
            'transition active:scale-90 dark:bg-success hover:dark:bg-success',
        clearBtn:
            'transition active:scale-90 active:dark:scale-90 focus:dark:outline-0 focus:outline-0',
        icons: 'active:scale-125 transition duration-100 dark:bg-transparent',
        text: 'hover:dark:bg-transparent transition',
        disabledText: 'pointer-events-none blur',
        input: 'rounded-3xl fade-in dark:bg-base-300',
        inputIcon: 'fade-in z-50',
        selected:
            'bg-transparent scale-150 duration-100 dark:text-success transition',
    },
    icons: {
        prev: () => (
            <span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 96 960 960"
                    width="24"
                >
                    <path
                        fill="#FFFFFF"
                        d="M480 896 160 576l320-320 57 56-224 224h487v80H313l224 224-57 56Z"
                    />
                </svg>
            </span>
        ),
        next: () => (
            <span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 96 960 960"
                    width="24"
                >
                    <path
                        fill="#FFFFFF"
                        d="m480 896-57-56 224-224H160v-80h487L423 312l57-56 320 320-320 320Z"
                    />
                </svg>
            </span>
        ),
    },
    datepickerClassNames:
        'fixed inset-10 inset-x-2 flex items-center justify-center w-72 h-96 ',
    defaultDate: new Date(),
    language: 'en',
}

export default options
