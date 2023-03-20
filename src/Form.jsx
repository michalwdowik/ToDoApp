/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useEffect, useContext, useRef, useMemo } from "react";
import categories from "./Categories/categories";
import Button from "./Components/Button";
import CategoryPicker from "./Categories/CategoryPicker";
import Importance from "./Components/Importance";
import CustomDatePicker from "./Components/CustomDatePicker";

import {
  CategoryParamsContext,
  TaskDetailsContext,
  AlertContext,
} from "./Contexts/Contexts";

export default function Form({ colorStyle, setColorStyle }) {
  const { taskList, setTaskList, setSelectedTabCategory, groupTaskList } =
    useContext(TaskDetailsContext);

  const [selectedCategoryName, setSelectedCategoryName] = useState("general");
  const [selectedCategoryUUID, setSelectedCategoryUUID] = useState(
    categories[0].uuid
  );
  const [rating, setRating] = useState(2);
  const inputRef = useRef("");

  const [isCorrectTyped, setIsCorrectTyped] = useState(true);
  const [taskDeadline, setTaskDeadline] = useState("Not specified");

  const { setIsReachedMaxAlertVisible } = useContext(AlertContext);

  const [icon, setIcon] = useState("AiFillWallet");
  const [isSelectDateChecked, setIsSelectDateChecked] = useState(false);

  useEffect(() => {
    if (taskList.length === 0) {
      setSelectedCategoryName("general");
      setSelectedCategoryUUID(categories[0].uuid);
      setSelectedTabCategory("all");
      setColorStyle("info");
      setIcon("AiFillWallet");
      setTaskDeadline("Not specified");
      setIsSelectDateChecked(false);
    }
  }, [taskList.length]);

  // const datePicker = useMemo(
  //   () => (
  //     <CustomDatePicker
  //       colorStyle={colorStyle}
  //       setTaskDeadline={setTaskDeadline}
  //       isSelectDateChecked={isSelectDateChecked}
  //       setIsSelectDateChecked={setIsSelectDateChecked}
  //     />
  //   ),
  //   [taskDeadline]
  // );

  const submitHandler = (e) => {
    e.preventDefault();
    if (inputRef.current.value !== "") {
      if (groupTaskList().length >= 9) {
        setIsReachedMaxAlertVisible(true);
        setTimeout(() => {
          setIsReachedMaxAlertVisible(false);
        }, 3000);
        return;
      }

      setTaskList([
        ...taskList,
        {
          name: inputRef.current.value,
          category: selectedCategoryName,
          done: false,
          rate: rating,
          deadline: taskDeadline,
          icon,
          colorStyle,
        },
      ]);
      inputRef.current.value = "";

      groupTaskList();
      setIsSelectDateChecked(false);
      setTaskDeadline("Not specified");
      setIsCorrectTyped(true);
    } else {
      setIsCorrectTyped(false);
    }
  };

  const setCategoryAndColor = (e) => {
    setSelectedCategoryName(e.name);
    setSelectedCategoryUUID(e.uuid);
    setIcon(e.icon);
    setColorStyle(e.colorStyle);
  };

  return (
    <div className="customCard flex w-full flex-col gap-7 p-5">
      <span className="label-text mt-2 -mb-6 text-slate-700">Add Task:</span>
      <div className="flex w-5/6 gap-5 sm:w-4/6 md:w-4/6">
        <input
          maxLength={30}
          ref={inputRef}
          type="text"
          placeholder="Type here..."
          id="taskInput"
          className={`customShadow w-full rounded-3xl bg-base-300  ${
            !isCorrectTyped ? "input-error" : "input"
          }  input ${inputRef !== "" && "focus:input-success"}`}
        />
        <Button
          toolTipClass="tooltip hover:tooltip hover:tooltip-open hover:tooltip-success"
          toolTipText="Add Task"
          className="btn-m customShadow btn-success btn-circle btn"
          buttonType="button"
          action={submitHandler}
          title={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          }
        />
      </div>
      <CategoryParamsContext.Provider
        value={{
          selectedCategoryName,
          setCategoryAndColor,
          colorStyle,
          setSelectedCategoryName,
          setColorStyle,
          selectedCategoryUUID,
          setSelectedCategoryUUID,
        }}
      >
        <CategoryPicker />
        <Importance rating={rating} setRating={setRating} />
      </CategoryParamsContext.Provider>
      <CustomDatePicker
        colorStyle={colorStyle}
        setTaskDeadline={setTaskDeadline}
        isSelectDateChecked={isSelectDateChecked}
        setIsSelectDateChecked={setIsSelectDateChecked}
      />
    </div>
  );
}
