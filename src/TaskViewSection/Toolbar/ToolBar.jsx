/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { colorStyleInputHandler } from "../../colorStyleClassHandler";
import Alert from "../../Components/Alert";
import ToolbarButtons from "./ToolbarButtons";

export default function ToolBar({ searchInput, onInput, colorStyle }) {
  const [alertData, setAlertData] = useState({});

  return (
    <div className="relative flex gap-5 border-error">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-gray-500 dark:text-gray-400 "
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <input
        value={searchInput}
        onInput={onInput}
        type="text"
        id="simple-search"
        className={` ${colorStyleInputHandler(
          colorStyle
        )} customShadow input block w-full rounded-3xl border-0
       bg-base-300 pl-10 text-xs placeholder-transparent dark:text-white
             sm:text-sm sm:placeholder-gray-400  `}
        placeholder="Search task"
      />
      <ToolbarButtons setAlertData={setAlertData} />
      <Alert alertData={alertData} />
    </div>
  );
}