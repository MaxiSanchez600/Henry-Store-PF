import React, { useState } from 'react';
import { connect } from 'react-redux';

import { getAllFilteredProducts } from '../../Redux/actions/actions';

function Filters({ queriesFromReducer, sendFiltersToActions }) {


  // ! ***** FILTERS ****
  const [filtersToSend, setFiltersToSend] = useState({
    // type: "",
    // rangePriceMin: 0,
    // rangePriceMax: 0,
    // color: "",
  });

  // const [categoryFilters, setCategoryFilters] = useState({
  //   genero: "",
  //   talle: "",
  // });

  // const [selectedFilter, setSelectedFilter] = useState("");

  function handleFilters(e) {
    // setSelectedFilter(e.target.name);
    // console.log("e.target.value: ", e.target.value);
    setFiltersToSend({
      ...filtersToSend,
      [e.target.name]: e.target.value
    });
    if (!e.target.value) {
      closeSelectedFilterButton(e);
    }
    else {
      sendFiltersToActions({ ...queriesFromReducer, [e.target.name]: e.target.value });
    }
  }

  function closeSelectedFilterButton(e) {
    e.preventDefault();
    // console.log("name of filter to be removed -> e.target.name: ", e.target.name);

    delete queriesFromReducer[e.target.name];
    delete filtersToSend[e.target.name];
    setFiltersToSend({
      ...filtersToSend,
      // [e.target.name]: e.target.value
    });
    // setSelectedFilter("");
    sendFiltersToActions({ ...queriesFromReducer });
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendFiltersToActions({ ...queriesFromReducer });
  }

  // ! ***** CONTENT ****
  return (
    <form onSubmit={e => handleSubmit(e)}>
      {
        Object.keys(filtersToSend).map((filterName) => (
          <div key={filterName}>
            <p>{`${filterName}: ${filtersToSend[filterName]}`}</p>
            <button
              name={filterName}
              onClick={e => closeSelectedFilterButton(e)}
            >x</button>
          </div>
        ))
      }
      <div>Subcategoria
        <select name="type" onChange={e => handleFilters(e)}>
          <option name="type" value="3">Buso</option>
          <option name="type" value="cuaderno">Cuaderno</option>
          <option name="type" value="5">Gorra</option>
          <option name="type" value="lentes">Lentes</option>
          <option name="type" value="remera">Remera</option>
          <option name="type" value="taza">Taza</option>
          <option name="type" value="tecnologia">Tecnologia</option>
        </select>
      </div>
      {/* <input type="submit" value="Filtrar por tipo" /> */}
      <input
        name="rangePriceMin"
        type="number"
        placeholder="Precio minimo"
        value={filtersToSend.rangePriceMin}
        // value={
        //   filtersToSend.rangePriceMin > filtersToSend.rangePriceMax ?
        //     filtersToSend.rangePriceMax :
        //     filtersToSend.rangePriceMin
        // }
        onChange={e => handleFilters(e)}
        min={0}
      />
      <input
        name="rangePriceMax"
        type="number"
        placeholder="Precio maximo"
        value={filtersToSend.rangePriceMax}
        // value={
        //   filtersToSend.rangePriceMax < filtersToSend.rangePriceMin ?
        //     filtersToSend.rangePriceMin :
        //     filtersToSend.rangePriceMax
        // }
        onChange={e => handleFilters(e)}
        min={0}
      />
      {/* <input type="submit" value="Filtrar por precio" /> */}
      <select name="color" onChange={e => handleFilters(e)}>
        <option value="Blanco">Blanco</option>
        <option value="Negro">Negro</option>
        <option value="Amarillo">Amarillo</option>
      </select>
      {/* <input type="submit" value="Filtrar por color" /> */}
      {
        queriesFromReducer.category === "Ropa" ?
          <div>
            <select name="genero" onChange={e => handleFilters(e)}>
              <option value="Unisex">Unisex</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
            </select>
            <select name="talle" onChange={e => handleFilters(e)}>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div> : ""
      }
    </form>

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

export default connect(mapStateToProps, mapDispatchToProps)(Filters);