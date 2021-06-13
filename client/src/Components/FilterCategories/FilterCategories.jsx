import React, { useState } from "react";
import { connect } from "react-redux";

import { getAllFilteredProducts } from "../../Redux/actions/actions";

function FilterCategories({ queriesFromReducer, sendFiltersToActions }) {

  const [selectedCategory, setSelectedCategory] = useState("");

  function handleOptions(e) {
    // console.log("e.target.value: ", e.target.value);
    switch (e.target.value) {
      case "ropa":
        // console.log("category ropa");
        sendFiltersToActions({ ...queriesFromReducer, [e.target.name]: e.target.value });
        break;
      default:
        // console.log("other category");
        const { genero, talle, ...otherCategoriesFilters } = { ...queriesFromReducer };
        sendFiltersToActions({ ...otherCategoriesFilters, [e.target.name]: e.target.value });
        break;
    }
    setSelectedCategory(e.target.value);
  }

  function closeSelectedFilterButton(e) {
    e.preventDefault();
    setSelectedCategory("");
    const { genero, talle, category, ...removedFilters } = { ...queriesFromReducer };
    sendFiltersToActions({ ...removedFilters });
  }

  return (
    <div>
      <select name="category" onChange={e => handleOptions(e)} placeholder="Categorias...">
        <option value="Ropa">Ropa</option>
        <option value="Accesorios">Accesorios</option>
        <option value="Otros">Otros</option>
      </select>
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