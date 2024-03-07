import React, { useEffect, useState } from "react";
import { Aside } from "../../aside/Aside";
import { Button } from "@material-ui/core";
import ImgUploader from "../../ImageGellery/uploadimage/ImageTabToggle";
import { ProductSidebar } from "../createproduct/ProductSidebar";
import MetaData from "../../../layout/metaData/MetaData";
// import ProductForm from "../productform/ProductForm";
import { useDispatch, useSelector } from "react-redux";
import { getAllImages } from "../../../../actions/imageGelleryAction";
import { useNavigate } from "react-router-dom";
import {
  ClearError,
  GetAllProductLabelAction,
  GetProductAttributeAction,
  GetProductLabelAction,
  createNewProduct,
} from "../../../../actions/ProductAction";
import { useAlert } from "react-alert";
import { NEW_PRODUCT_RESET } from "../../../../constants/ProductConstants";
import ProductForm from "./ProductForm";
import PublishSection from "./assets/PublishSection";
import generateUuid from "../../../../utils/Uuidv4";

export const CreateProduct = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const alert = useAlert();

  const { loding, error, success } = useSelector((state) => state.newProduct);

  const { images } = useSelector((state) => state.selectedImages);
  const [checkedItems, setCheckedItems] = useState([]);
  const [subcheckedItems, setSubCheckedItems] = useState([]);
  const [open, setOpen] = useState(false);
  // const [seoInputValue, setSeoInputValue] = useState({
  //   seotitle: "",
  //   keyword: "",
  //   metadec: "",
  //   metalink: "",
  // });

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [article, setArticle] = useState("");
  const [content, setContent] = useState("");
  const [product_Type, setProductType] = useState("Simple product");
  // Genral
  // const [general_Price, setGeneralPrice] = useState("");
  const [product_regular_price, setProduct_regular_price] = useState("");
  const [product_sale_price, setProduct_sale_price] = useState("");

  //Inventory
  const [SKU, setSKU] = useState("");
  const [Stock, setStock] = useState(true);
  const [Sold_Individually, setSold_Individually] = useState(false);
  const [Availability_Date, setAvailability_Date] = useState("");
  //Shiupping
  const [Weight, setWeight] = useState("");
  const [Dimensions, setDimensions] = useState("");
  const [Shipping_class, setShipping_class] = useState("");
  //Variations
  const [Default_value, setDefault_value] = useState("");
  const [Variations, setVariations] = useState("");

  // setSlug(title && title);
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

  const createProduct = (e) => {
    e.preventDefault();
    const imageIds = images && images.map((item) => item._id);
    // if (!seoInputValue) {
    //   return alert.error("seoInputValue is undefined or null");
    // }
    // const {
    //   seotitle,
    //   keyword: seokeyword,
    //   metadec: seometadec,
    //   metalink: seometalink,
    // } = seoInputValue;

    // if (
    //   name.trim() === "" ||
    //   slug.trim() === "" ||
    //   price.trim() === "" ||
    //   maxPrice.trim() === "" ||
    //   stock.trim() === "" ||
    //   article.trim() === "" ||
    //   content.trim() === "" ||
    //   seotitle.trim() === "" ||
    //   seokeyword.trim() === "" ||
    //   seometadec.trim() === "" ||
    //   seometalink.trim() === "" ||
    //   (checkedItems ?? []).length === 0 ||
    //   (subcheckedItems ?? []).length === 0 ||
    //   (imageIds ?? []).length === 0
    // ) {
    //   return alert.error(
    //     "Please fill out all required fields and upload at least one image. "
    //   );
    // }

    // dispatch(
    //   createNewProduct(
    //     title,
    //     slug,
    //     article,
    //     content,
    //     product_Type,
    //     general_Price,
    //     SKU,
    //     Stock,
    //     Sold_Individually,
    //     Availability_Date,
    //     Weight,
    //     Dimensions,
    //     Shipping_class,
    //     Variations,
    //     Default_value,
    //     subcheckedItems,
    //     checkedItems,
    //     imageIds
    //     // stock,
    //     // seotitle,
    //     // seometadec,
    //     // seokeyword,
    //     // seometalink
    //   )
    // );
  };

  //--------------handleImageClickOpen
  const handleImageClickOpen = () => {
    setOpen(true);

    dispatch(getAllImages());
  };
  //----------------handleImageClickClose

  const handleImageClickClose = () => {
    setOpen(false);
  };

  //---description
  const descriptionHeandle = (e) => {
    setArticle(e);
  };

  //----------short editor event--
  const shortdesHeandle = (e) => {
    setContent(e);
  };

  const handlePublishBut = () => {
    const imageIds = images && images.map((item) => item._id);
    let productData = {
      title: title,
      article: article,
      content: content,
      product_Type: product_Type,
      SKU: SKU,
      Stock: Stock,
      Sold_Individually: Sold_Individually,
      Availability_Date: Availability_Date,
      Weight: Weight,
      Dimensions: Dimensions,
      Shipping_class: Shipping_class,
      product_uuid: generateUuid(),
      product_regular_price:product_regular_price,
      product_sale_price:product_sale_price,
      Default_value:Default_value
    };
    let VariationData = Variations ? Variations : {};
    // let general_PriceData = general_Price ? general_Price : {};

    dispatch(
      createNewProduct(
        productData,
        VariationData,
        imageIds ? imageIds : [],
        subcheckedItems ? subcheckedItems : [],
        checkedItems ? checkedItems : []
      )
    );
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    // if (success) {
    //   dispatch({ type: NEW_PRODUCT_RESET });
    //   alert.success("product created");
    //   Navigate("/admin/all-products");
    // }
    // if (name) {
    //   setSeoInputValue((prev) => ({ ...prev, seotitle: name }));
    // }
    // if (slug) {
    //   setSeoInputValue((prev) => ({ ...prev, metalink: slug }));
    // }
    dispatch(GetAllProductLabelAction());
    // if (inputValue.attributesearch.length > 0) {
    //   dispatch(GetProductAttributeAction(inputValue.attributesearch));
    // } else {
    // }
    dispatch(GetProductAttributeAction(""));
  }, [alert, error, dispatch, success, Navigate, slug]);

  return (
    <>
      <MetaData
        title={"Admin create product list"}
        content={"Admin create product list"}
        keywords={"Admin create product list"}
      />
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="ad-section">
                <div className="all-products-cont">
                  <div className="all-products-content-area">
                    <div className="all-products-title">
                      <h1>demo List</h1>
                    </div>

                    <div className="create-page-contaionr">
                      <div className="from-contaionr">
                        {/* <ProductForm
                          createProduct={createProduct}
                          setName={setName}
                          setSlug={setSlug}
                          setPrice={setPrice}
                          setMaxPrice={setMaxPrice}
                          setStock={setStock}
                          // inputValue={inputValue}
                          // createProductInputHandle={createProductInputHandle}
                          articleContentHeandle={articleContentHeandle}
                          contentHeandle={contentHeandle}
                          seoInputValue={seoInputValue}
                          seoHandler={seoHandler}
                        /> */}
                        <ProductForm
                          setTitle={setTitle}
                          setProductType={setProductType}
                          setProduct_regular_price={setProduct_regular_price}
                          setProduct_sale_price={setProduct_sale_price}
                          setSKU={setSKU}
                          setStock={setStock}
                          setSold_Individually={setSold_Individually}
                          setAvailability_Date={setAvailability_Date}
                          setWeight={setWeight}
                          setDimensions={setDimensions}
                          setShipping_class={setShipping_class}
                          setVariations={setVariations}
                          descriptionHeandle={descriptionHeandle}
                          shortdesHeandle={shortdesHeandle}
                          setDefault_value={setDefault_value}
                        />
                        <Button onClick={createProduct}>addd</Button>
                      </div>
                      <div className="product-sidebar-containor">
                        <PublishSection handlePublishBut={handlePublishBut} />
                        <Button
                          variant="outlined"
                          onClick={handleImageClickOpen}
                        >
                          Image upload
                        </Button>
                        <ImgUploader
                          open={open}
                          close={handleImageClickClose}
                        />
                        <ProductSidebar
                          handleCheckboxChange={handleCheckboxChange}
                          handleSubCheckboxChange={handleSubCheckboxChange}
                          checkedItems={checkedItems}
                          subcheckedItems={subcheckedItems}
                        />
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
export default CreateProduct;
