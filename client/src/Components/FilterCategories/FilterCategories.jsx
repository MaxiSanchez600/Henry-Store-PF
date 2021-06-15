import React, { useState } from "react";
import { connect } from "react-redux";

import { getAllFilteredProducts } from "../../Redux/actions/actions";

function FilterCategories({ queriesFromReducer, sendFiltersToActions }) {

  const [selectedCategory, setSelectedCategory] = useState("");

  function handleOptions(e) {
    switch (e.target.value) {
      case "Ropa":
        sendFiltersToActions({ ...queriesFromReducer, [e.target.name]: e.target.value });
        break;
      default:
        const { genero, size, ...otherCategoriesFilters } = { ...queriesFromReducer };
        sendFiltersToActions({ ...otherCategoriesFilters, [e.target.name]: e.target.value });
        break;
    }
    setSelectedCategory(e.target.value);
  }

  function closeSelectedFilterButton(e) {
    e.preventDefault();
    setSelectedCategory("");
    const { genero, size, category, ...removedFilters } = { ...queriesFromReducer };
    sendFiltersToActions({ ...removedFilters });
  }

  // ! CONTENT
  return (
    <div className="FilterCategories">
      <select className="menu_category" name="category" onChange={e => handleOptions(e)}>
        <option value="Ropa">Ropa</option>
        <option value="Accesorios">Accesorios</option>
        <option value="Otros">Otros</option>
      </select>

      <button className="menu_category">Ofertas</button>
      <button className="menu_category">Historial</button>
      <button className="menu_category">Vender</button>
      <button className="menu_category">Ayuda/PQR</button>
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
    queriesFromReducer: state.queries
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendFiltersToActions: (allQueries) => dispatch(getAllFilteredProducts(allQueries))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterCategories);