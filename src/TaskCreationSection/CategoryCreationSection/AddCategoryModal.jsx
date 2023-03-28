/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useMemo, useState } from "react";
import { CirclePicker } from "react-color";
import { v4 as uuid } from "uuid";
import { createPortal } from "react-dom";
import IconPicker from "./IconPicker/IconPicker";
import {
  colorStyleBgHandler,
  colorPickerColorHandler,
} from "../../colorStyleClassHandler";
import Button from "../../Components/Button";
import categories from "../CategoryPicker/categories";
import Alert from "../../Components/Alert";

export default function AddCategoryModal({ forceUpdate }) {
  const [inputValue, setInputValue] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("IoIosHappy");
  const [newCategoryColor, setNewCategoryColor] = useState("info");
  const [colorPickerColor, setColorPickerColor] = useState("#38bdf8");

  const [isCorrectTyped, setIsCorrectTyped] = useState(true);
  const uniqueID = uuid();
  const portal = document.getElementById("portal");
  const [searchIcon, setSearchIcon] = useState("");
  const [alertData, setAlertData] = useState({});

  const isCategoryoriginal = () => {
    const x = categories.filter((category) => category.name === inputValue);
    return x.length === 0;
  };

  const onInput = (e) => {
    setInputValue(e.target.value);
    setIsCorrectTyped(e.target.value !== "");
  };

  const showAlert = (params) => {
    setAlertData({
      title: params.title,
      type: params.type,
      bg: params.bg,
      isShowed: params.isShowed,
    });
    setTimeout(() => {
      setAlertData({ isShowed: false });
    }, 3000);
  };

  const createNewCategory = () => {
    if (categories.length >= 12) {
      showAlert({
        title: "You can create up to 7 different categories",
        type: "error",
        bg: "bg-error",
        isShowed: true,
      });
      return;
    }

    if (inputValue !== "" && isCategoryoriginal()) {
      forceUpdate();
      categories.push({
        name: inputValue.toLowerCase(),
        icon: newCategoryIcon,
        colorStyle: newCategoryColor,
        isAddedByUser: true,
        uuid: uniqueID,
      });
      setInputValue("");
      showAlert({
        title: "New category has been added!",
        type: "success",
        bg: "bg-success",
        isShowed: true,
      });
    } else {
      setIsCorrectTyped(false);
      showAlert({
        title: "You can't create a category with this name, try again!",
        type: "error",
        bg: "bg-error",
        isShowed: true,
      });
    }
  };

  const iconPicker = useMemo(
    () => (
      <IconPicker
        newCategoryIcon={newCategoryIcon}
        setNewCategoryIcon={setNewCategoryIcon}
        colorStyle={newCategoryColor}
        searchIcon={searchIcon}
        setSearchIcon={setSearchIcon}
      />
    ),
    [searchIcon, newCategoryIcon]
  );

  const changeColorHandler = (color) => {
    setColorPickerColor(color.hex);
    setNewCategoryColor(colorPickerColorHandler(color));
  };

  const colorPicker = useMemo(
    () => (
      <CirclePicker
        className="m-0 self-center p-0"
        color={colorPickerColor}
        colors={["#38bdf8", "#f87171", "#10b981", "#7e22ce", "#eab308"]}
        onChangeComplete={changeColorHandler}
      />
    ),
    [colorPickerColor]
  );

  return (
    <div>
      <label
        htmlFor="my-modal-3"
        className="dark:bg:transparent btn-xs btn m-0 border-0 bg-transparent p-1 font-normal text-slate-700 hover:scale-110 hover:bg-transparent"
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
      {createPortal(
        <div>
          <input type="checkbox" id="my-modal-3" className="modal-toggle " />
          <label htmlFor="my-modal-3" className="modal cursor-pointer">
            <label className="modal-box mt-5 flex flex-col content-center justify-center gap-3 rounded-3xl bg-slate-100 p-5 pt-10">
              <div className="indicator">
                <input
                  maxLength={17}
                  onInput={onInput}
                  value={inputValue}
                  type="text"
                  placeholder="Type here..."
                  id="taskInput"
                  className={`input-bordered ${
                    isCorrectTyped ? "input" : "input-error"
                  }  input w-full max-w-xs ${
                    isCorrectTyped && "focus:input"
                  } input mb-5 mr-5`}
                />
                <Button
                  action={createNewCategory}
                  className={`text-white ${colorStyleBgHandler(
                    newCategoryColor
                  )} btn-circle transition-all active:scale-90`}
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
              {colorPicker}
              {iconPicker}
            </label>
          </label>
        </div>,
        portal
      )}
      <Alert alertData={alertData} />
    </div>
  );
}
