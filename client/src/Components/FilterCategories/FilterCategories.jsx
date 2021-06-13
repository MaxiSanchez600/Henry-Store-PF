import React, { useState } from "react";
import { connect } from "react-redux";

import { getAllFilteredProducts } from "../../Redux/actions/actions";

function FilterCategories({ queriesFromReducer, sendFiltersToActions }) {

  const [selectedCategory, setSelectedCategory] = useState("");

  function handleOptions(e) {
    console.log("e.target.value: ", e.target.value);
    switch (e.target.value) {
      case "ropa":
        console.log("category ropa");
        sendFiltersToActions({ ...queriesFromReducer, [e.target.name]: e.target.value });
        break;
      default:
        console.log("other category");
        const { sex, talle, ...otherCategoriesFilters } = { ...queriesFromReducer };
        sendFiltersToActions({ ...otherCategoriesFilters, [e.target.name]: e.target.value });
        break;
    }
    setSelectedCategory(e.target.value);
  }

  function closeSelectedFilterButton(e) {
    e.preventDefault();
    setSelectedCategory("");
    const { sex, talle, category, ...removedFilters } = { ...queriesFromReducer };
    sendFiltersToActions({ ...removedFilters });
  }

  // ! CONTENT
  return (
    <div className="FilterCategories">
      <select className="menu_category" name="category" onChange={e => handleOptions(e)} placeholder="Categorias...">
        <option value="ropa">Ropa</option>
        <option value="accesorios">Accesorios</option>
        <option value="otros">Otros</option>
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