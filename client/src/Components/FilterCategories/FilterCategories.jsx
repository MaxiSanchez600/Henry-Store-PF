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

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (!categoriesFromReducer.length) getCategoriesFromActions();
    if (!caracteristicsFromReducer.length) getCaracteristicsFromActions();
    // console.log("useEffect -> categoriesFromReducer: ", categoriesFromReducer);
  }, [categoriesFromReducer]);

  function handleOptions(e) {
    console.log("handleOptions -> e.target.value: ", e.target.value);
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
    // console.log("removePreviousFilters -> filters to be removed: ", removedFilters);
    caracteristicsFromReducer.forEach(caracteristic => {
      delete removedFilters[caracteristic.name_caracteristic];
    });
    // console.log("removePreviousFilters -> removedFilters: ", removedFilters);
    return { ...removedFilters };
  }

  function closeSelectedFilterButton(e) {
    // console.log("caracteristicsFromReducer: ", caracteristicsFromReducer);
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
      {/* <button className="menu_category">Ofertas</button>
      <button className="menu_category">Historial</button>
      <button className="menu_category">Vender</button>
      <button className="menu_category">Ayuda/PQR</button> */}
      {
        selectedCategory ?
          <div>
            <p>Categoria: {selectedCategory}</p>
            <button
              name={selectedCategory}
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