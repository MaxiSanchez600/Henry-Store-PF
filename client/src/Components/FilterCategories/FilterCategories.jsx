import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  getAllFilteredProducts,
  getAllCategories,
  getAllCaracteristics,
} from "../../Redux/actions/actionsProducts";

function FilterCategories({
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
    if (!categoriesFromReducer.length) getCategoriesFromActions();
    if (!caracteristicsFromReducer.length) getCaracteristicsFromActions();
  }, [categoriesFromReducer]);

  function handleOptions(e) {
    if (!e.target.value) {
      closeSelectedFilterButton(e);
    }
    else {
      const removedPreviousFilters = removePreviousFilters();
      sendFiltersToActions({ ...removedPreviousFilters, [e.target.name]: e.target.value });
      getCaracteristicsFromActions({ [e.target.name]: e.target.value });
    }
    setSelectedCategory(e.target.value);
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
    setSelectedCategory("");
    // const test = document.getElementById(`rangePriceMin`);
    // test.value = 1;

    const removedPreviousFilters = removePreviousFilters();

    sendFiltersToActions({ ...removedPreviousFilters });
    getCaracteristicsFromActions();
  }

  // ! CONTENT
  return (
    <div className="FilterCategories">
      <select className="menu_category" name="category" onChange={e => handleOptions(e)}>
        <option value="">Selecciona una categoria...</option>
        {
          categoriesFromReducer.map(category => (
            <option key={category.id_category} value={category.name_category}>{category.name_category}</option>
          ))
        }
      </select>
      {
        queriesFromReducer.category ?
          <div>
            <p>Categoria: {queriesFromReducer.category}</p>
            <button
              name={queriesFromReducer.category}
              onClick={e => closeSelectedFilterButton(e)}
            >x</button>
          </div> :
          ""
      }
    </div>
  );
}

function mapStateToProps(state) {
  return {
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