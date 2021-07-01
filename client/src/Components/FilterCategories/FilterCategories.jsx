import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  getAllFilteredProducts,
  getAllCategories,
  getAllCaracteristics,
} from "../../Redux/actions/actionsProducts";

function FilterCategories({
  ListProducts,
  queriesFromReducer,
  categoriesFromReducer,
  caracteristicsFromReducer,
  getCategoriesFromActions,
  getCaracteristicsFromActions,
  sendFiltersToActions,
}) {
 //este estado no esta leido sirve?
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (ListProducts.length) {
      // if (!categoriesFromReducer.length && !caracteristicsFromReducer.length) {
      //   getCategoriesFromActions();
      //   getCaracteristicsFromActions();
      // }
      if (!categoriesFromReducer.length) getCategoriesFromActions();
      if (!caracteristicsFromReducer.length) getCaracteristicsFromActions();
    }
  }, [ListProducts, getCategoriesFromActions, getCaracteristicsFromActions, categoriesFromReducer, caracteristicsFromReducer]);

  function handleOptions(e) {
    if (e.target.value === "default") {
      closeSelectedFilterButton(e);
    }
    else if (e.target.value !== "default") {
      const removedPreviousFilters = removePreviousFilters();
      sendFiltersToActions({ ...removedPreviousFilters, [e.target.name]: e.target.value });
      getCaracteristicsFromActions({ [e.target.name]: e.target.value });
      setSelectedCategory(e.target.value);
    }
  }

  function removePreviousFilters() {
    const { category, tag, ...removedFilters } = { ...queriesFromReducer };
    caracteristicsFromReducer.forEach(caracteristic => {
      delete removedFilters[caracteristic.name_caracteristic];
    });
    return { ...removedFilters };
  }

  function closeSelectedFilterButton(e) {
    e.preventDefault();
    const filterToBeRemoved = document.getElementById(`filter_name_${e.target.name}`);
    if (filterToBeRemoved) filterToBeRemoved.value = "default";
    setSelectedCategory("");
    const removedPreviousFilters = removePreviousFilters();
    sendFiltersToActions({ ...removedPreviousFilters });
    getCaracteristicsFromActions();
  }

  // ! CONTENT
  return (
    <div className="FilterCategories">
      <div className="categories_select_container">
        <h3 className="category_filter_title">Categorias:<div className="title_stripe"></div></h3>
        <select
          id={`filter_name_category`}
          className="filter_menu_category"
          name="category"
          onChange={e => handleOptions(e)}>
          <option value="default">Selecciona...</option>
          {
            categoriesFromReducer.map(category => (
              <option key={category.id_category} value={category.name_category}>{category.name_category}</option>
            ))
          }
        </select>
      </div>
      <div className="selected_category_button_container">
        {
          queriesFromReducer.category ?
            <div className="category_box_filter">
              <p className="category_filter_title_selected">Categoria: {queriesFromReducer.category}</p>
              <button
                name="category"
                onClick={e => closeSelectedFilterButton(e)}
                className="category_button_filtered"
              >x</button>
            </div> :
            ""
        }
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ListProducts: state.products.products,
    queriesFromReducer: state.products.queries,
    categoriesFromReducer: state.products.categories,
    caracteristicsFromReducer: state.products.caracteristics,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendFiltersToActions: (allQueries) => dispatch(getAllFilteredProducts(allQueries)),
    getCategoriesFromActions: () => dispatch(getAllCategories()),
    getCaracteristicsFromActions: (category) => dispatch(getAllCaracteristics(category)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterCategories);