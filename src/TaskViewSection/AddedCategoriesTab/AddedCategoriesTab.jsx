import React, { useContext } from "react";
import { MainContext } from "../../Contexts";
import CategoryTab from "./CategoryTab";

export default function AddedCategoriesTab() {
  const { addedCategoriesTab } = useContext(MainContext);
  console.log({ addedCategoriesTab })
  return (
    <div>
      <ul className="flex flex-wrap justify-center max-w-sm gap-0 p-0 customShadow menu rounded-box menu-horizontal sm:max-w-lg md:max-w-lg">
        {addedCategoriesTab.map((_, index) => (
          <CategoryTab
            key={addedCategoriesTab[index].categoryUUID}
            addedCategoryTab={addedCategoriesTab[index]}
            addedCategoriesTabLength={addedCategoriesTab.length}
          />
        ))}
      </ul>
    </div>
  );
}
