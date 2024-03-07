import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  CreateNewCategore,
  clearErrors,
} from "../../../../../actions/CategoreAction";
import { useDispatch, useSelector } from "react-redux";

import { useAlert } from "react-alert";
import Loader from "../../../../layout/loader/Loader";
import { NEW_CATEGORIE_RESET } from "../../../../../constants/CategoreConstants";
import SelectCategore from "./SelectCategore";
import CreateSeo from "../../../seo/create/CreateSeo";

const CategoreForm = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [checkedItems, setCheckedItems] = useState([]);
  const [subcheckedItems, setSubCheckedItems] = useState([]);
  const { loading, success, message, error } = useSelector(
    (state) => state.adminCategore
  );

  const [seoInputValue, setSeoInputValue] = useState({
    seotitle: "",
    keyword: "",
    metadec: "",
    metalink: "",
  });

  const [inputValue, setInputValue] = useState({
    name: "",
    slug: "",
    parent: "",
    title: "",
    description: "",
  });

  const handelInputValue = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const seoHandler = (e) => {
    const { name, value } = e.target;

    setSeoInputValue({ ...seoInputValue, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { seotitle, keyword, metadec } = seoInputValue;
    const { name, slug, title, description } = inputValue;
    dispatch(
      CreateNewCategore(
        name,
        slug,
        title,
        checkedItems,
        subcheckedItems,
        description,
        seotitle,
        keyword,
        metadec
      )
    );
  };

  const handleCheckboxChange = (itemIndex, id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubCheckboxChange = (itemIndex, id) => {
    setSubCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      setInputValue({
        name: "",
        slug: "",
        title: "",
        parent: "",
        description: "",
      });
      setSeoInputValue({
        seotitle: "",
        keyword: "",
        metadec: "",
        metalink: "",
      });
      alert.success("Categore successfuly created");
      dispatch({ type: NEW_CATEGORIE_RESET });
    }

    if (inputValue.title) {
      setSeoInputValue((prev) => ({ ...prev, seotitle: inputValue.title }));
    }
    if (inputValue.slug) {
      setSeoInputValue((prev) => ({ ...prev, metalink: inputValue.slug }));
    }
  }, [alert, error, dispatch, message, success, inputValue]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="create-page-contaionr">
            <div className="from-contaionr">
              <form onSubmit={submitHandler}>
                <div className="input-field-area">
                  <label>Name</label>
                  <input
                    type="text"
                    value={inputValue.name}
                    name="name"
                    onChange={handelInputValue}
                  />
                </div>
                <div className="input-field-area">
                  <label>Slug</label>
                  <input
                    type="text"
                    value={inputValue.slug}
                    name="slug"
                    onChange={handelInputValue}
                  />
                </div>

                <div className="input-field-area">
                  <label>Title</label>
                  <input
                    type="text"
                    value={inputValue.title}
                    name="title"
                    onChange={handelInputValue}
                  />
                </div>
                <div className="input-field-area">
                  <label>Description</label>
                  <input
                    type="text"
                    value={inputValue.description}
                    name="description"
                    onChange={handelInputValue}
                  />
                </div>
                <div>
                  <Button type="submit">Submit</Button>
                </div>
              </form>

              <CreateSeo
                seoInputValue={seoInputValue}
                seoHandler={seoHandler}
                submitHandler={submitHandler}
              />
            </div>
            <div className="product-sidebar-containor">
              <div className="cat-containor">
                <h2>Categories</h2>
                <SelectCategore
                  handleCheckboxChange={handleCheckboxChange}
                  handleSubCheckboxChange={handleSubCheckboxChange}
                  checkedItems={checkedItems}
                  subcheckedItems={subcheckedItems}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CategoreForm;
