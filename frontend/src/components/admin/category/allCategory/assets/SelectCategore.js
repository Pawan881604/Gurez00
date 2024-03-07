import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../../../actions/CategoreAction";

const SelectCategore = ({
  handleCheckboxChange,
  handleSubCheckboxChange,
  checkedItems,
  subcheckedItems,
}) => {
  const dispatch = useDispatch();

  const {
    loading: catLoading,
    allcategroes,
    error: caterror,
  } = useSelector((state) => state.allCategroe);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  return (
    <>
      <ul className="category-ul">
        {allcategroes &&
          allcategroes.map((parentCategory, i) => (
            <li key={i} value={parentCategory._id}>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name={parentCategory._id}
                    onClick={() => handleCheckboxChange(i, parentCategory._id)}
                    checked={
                      checkedItems &&
                      checkedItems.includes &&
                      checkedItems.includes(parentCategory._id)
                    }
                    onChange={(event) => {}}
                  />
                  {parentCategory.name}
                </label>
              </div>

              <ul>
                {parentCategory.childs.length > 0 &&
                  parentCategory.childs.map((childCategory, j) => (
                    <li key={j} value={childCategory._id}>
                      <div>
                        <label>
                          <input
                            type="checkbox"
                            name={childCategory._id}
                            onClick={() =>
                              handleSubCheckboxChange(j, childCategory._id)
                            }
                            checked={
                              subcheckedItems &&
                              subcheckedItems.includes &&
                              subcheckedItems.includes(childCategory._id)
                            }
                            onChange={(event) => {}}
                          />

                          {childCategory.name}
                        </label>
                      </div>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
      </ul>
    </>
  );
};

export default SelectCategore;
