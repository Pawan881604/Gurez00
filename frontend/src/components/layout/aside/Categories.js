import React from "react";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const Categories = ({ clearFilter }) => {
  const {
    loading: catLoading,
    allcategroes,
    error: caterror,
  } = useSelector((state) => state.allCategroe);

  // useEffect(() => {
  //   if (clearFilter) {
  //     setRemoveClass(true);
  //   }

  // }, [clearFilter]);

  return (
    <>
      <Typography>Categories</Typography>

      <div>
        <ul>
          {allcategroes &&
            allcategroes.map((item, i) => (
              <li key={i}>
                <NavLink
                  to={`/product-category/${item.slug}`}
                  className="parent-cate-list"
                >
                  {item.name}
                </NavLink>
                <ul>
                  {item.childs.map((subitem, i) => (
                    <li key={i}>
                      <NavLink
                        to={`/product-category/${item.slug}/${subitem.slug}`}
                      >
                        {subitem.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Categories;
