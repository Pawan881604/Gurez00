import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { useAlert } from "react-alert";
import { NavLink, useNavigate } from "react-router-dom";
import { Aside } from "../../aside/Aside";
import { FaUpRightFromSquare, FaTrash } from "react-icons/fa6";
import { Helmet } from "react-helmet";
import Loader from "../../../layout/loader/Loader";
import MetaData from "../../../layout/metaData/MetaData";
import CategoreForm from "./assets/CategoreForm";
import {
  StausCategory,
  StausSubCategory,
  getAllCategories,
} from "../../../../actions/CategoreAction";
import { Switch } from "@material-ui/core";
import { STATUS_CATEGORIE_RESET } from "../../../../constants/CategoreConstants";

const AllCategory = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  // const Navigate = useNavigate();

  const [checked, setChecked] = useState({});
  const [subChecked, setSubChecked] = useState({});

  const {
    loading: catLoading,
    allcategroes,
    error: caterror,
  } = useSelector((state) => state.allCategroe);

  const {
    loading: updatecatStatusLoading,
    isUpdate,
    error: updatecatStatuserror,
  } = useSelector((state) => state.adminCategoryStatusUpdate);

  useEffect(() => {
    if (updatecatStatuserror) {
      alert.error(updatecatStatuserror);
    }
    if (isUpdate) {
      dispatch({ type: STATUS_CATEGORIE_RESET });
    }
    dispatch(getAllCategories());
  }, [dispatch, updatecatStatuserror, isUpdate]);

  const handleChange = (id) => {
    const newCheckedState = !checked[id];
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    dispatch(StausCategory(id, newCheckedState));
  };


  const handleChangeSubCat = (id) =>{
    const newCheckedState = !subChecked[id];
    setSubChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    dispatch(StausSubCategory(id, newCheckedState));
  }


  const columns = [
    {
      field: "id",
      headerName: "Product id",
      minWidth: 100,
      width: 10,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      width: 10,
    },

    {
      field: "description",
      headerName: "description",
      minWidth: 200,
      width: 10,
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 200,
      width: 10,
      shortable: false,
      renderCell: (params) => {
        
        const rowStatus = params.row.status;
        return (
          <>
            <MetaData
              title={"Admin all product list"}
              content={"Admin all product list"}
              keywords={"Admin all product list"}
            />
            <NavLink
              to={`/admin/product/update-categorie/${params.row.parentid}`}
            >
              <FaUpRightFromSquare />
            </NavLink>
            <Switch
              className={rowStatus ? "toggle-chekbox-active" : ""}
              checked={checked[params.row.parentid] || false}
              onChange={() => handleChange(params.row.parentid)}
              inputProps={{ "aria-label": "controlled" }}
            />
            <span
            // onClick={() =>
            //   deletehandler(params.getValue(params._id, "id"))
            // }
            >
              <FaTrash />
            </span>
          </>
        );
      },
    },
  ];

  const subColumns = [
    {
      field: "id",
      headerName: "Product id",
      minWidth: 100,
      width: 10,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      width: 10,
    },
    ,
    {
      field: "parent",
      headerName: "Parent",
      minWidth: 100,
      width: 10,
    },

    {
      field: "description",
      headerName: "description",
      minWidth: 200,
      width: 10,
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 200,
      width: 10,
      shortable: false,
      renderCell: (params) => {

        const rowStatus = params.row.substatus;
        return (
          <>
            <MetaData
              title={"Admin all product list"}
              content={"Admin all product list"}
              keywords={"Admin all product list"}
            />
            <NavLink
              to={`/admin/update-sub-categorie/${params.row.subid}`}
            >
              <FaUpRightFromSquare />
            </NavLink>
            <Switch
              className={rowStatus ? "toggle-chekbox-active" : ""}
              checked={subChecked[params.row.subid] || false}
              onChange={() => handleChangeSubCat(params.row.subid)}
              inputProps={{ "aria-label": "controlled" }}
            />
            <span
            // onClick={() =>
            //   deletehandler(params.getValue(params._id, "id"))
            // }
            >
              <FaTrash />
            </span>
          </>
        );
      },
    },
  ];

  const rows = [];
  const rowsSub = [];
  allcategroes &&
    allcategroes.forEach((item, i) => {
      rows.push({
        id: i+1,
        parentid: item._id,
        name: item.name,
        description: item.description,
        status: item.categorystatus,
      });
      item.childs.forEach((subItem,j) => {
    
        rowsSub.push({
          id: j+1,
          subid: subItem._id,
          name: subItem.name,
          parent: item.name,
          description: subItem.description,
          substatus: subItem.subcategorystatus,
        });
      });
    });
  return (
    <>
      <Helmet>
        <title itemProp="name" lang="en">
          Admin All Products
        </title>
        <meta name="keywords" content="Admin All Products" />
      </Helmet>
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="ad-section">
                <div className="all-products-cont">
                  <div className="all-products-content-area">
                    <div className="all-products-title">
                      <h1>products category </h1>
                    </div>
                    <div className="categore-row">
                      <div className="categore-coll">
                        <CategoreForm />
                      </div>
                      <div id="parent-category" className="categore-coll">
                        <h2>Parent category</h2>
                        <div className="productdata">
                          {catLoading && updatecatStatusLoading ? (
                            <Loader />
                          ) : (
                            <>
                              {allcategroes && allcategroes.length > 0 ? (
                                <>
                                  <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    // page={10}
                                    disableSelectionOnClick
                                    className="product-list-table"
                                    autoHeight
                                  />
                                </>
                              ) : (
                                <p>no data found</p>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      <div className="categore-coll">
                        <h2>Sub category</h2>
                        <div className="productdata">
                        {catLoading && updatecatStatusLoading ? (
                            <Loader />
                          ) : (
                            <>
                              {allcategroes && allcategroes.length > 0 ? (
                                <>
                                  <DataGrid
                                    rows={rowsSub}
                                    columns={subColumns}
                                    // page={10}
                                    disableSelectionOnClick
                                    className="product-list-table"
                                    autoHeight
                                  />
                                </>
                              ) : (
                                <p>no data found</p>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCategory;
