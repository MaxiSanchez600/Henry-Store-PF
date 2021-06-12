import React, { useState } from 'react';
import { connect } from 'react-redux';

import { getAllFilteredProducts } from '../../Redux/actions/actions';

function Filters({ queriesFromReducer, sendFiltersToActions }) {

  const [filtersToSend, setFiltersToSend] = useState({
    // type: "",
    // rangePriceMin: 0,
    // rangePriceMax: 0,
    // color: "",
  });

  // const [categoryFilters, setCategoryFilters] = useState({
  //   sex: "",
  //   talle: "",
  // });

  // const [selectedFilter, setSelectedFilter] = useState("");

  function handleFilters(e) {
    console.log("filter name -> e.target.name: ", e.target.name);
    console.log("filter type -> e.target.type: ", e.target.type);
    console.log("filter value -> e.target.value: ", e.target.value);

    setFiltersToSend({
      ...filtersToSend,
      [e.target.name]: e.target.value
    });
    // setSelectedFilter(e.target.name);
    sendFiltersToActions({ ...queriesFromReducer, [e.target.name]: e.target.value });
  }

  function closeSelectedFilterButton(e) {
    e.preventDefault();
    console.log("name of filter to be removed -> e.target.name: ", e.target.name);

    delete queriesFromReducer[e.target.name];
    delete filtersToSend[e.target.name];

    // setSelectedFilter("");
    sendFiltersToActions(queriesFromReducer);
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendFiltersToActions(queriesFromReducer);
  }

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
      <select name="type" onChange={e => handleFilters(e)}>
        <option name="type" value="buso">Buso</option>
        <option name="type" value="cuaderno">Cuaderno</option>
        <option name="type" value="gorra">Gorra</option>
        <option name="type" value="lentes">Lentes</option>
        <option name="type" value="remera">Remera</option>
        <option name="type" value="taza">Taza</option>
        <option name="type" value="tecnologia">Tecnologia</option>
      </select>
      <input type="submit" value="Filtrar por tipo" />
      <input
        name="rangePriceMin"
        type="number"
        placeholder="Precio minimo"
        // value={filtersToSend.rangePriceMin}
        value={
          filtersToSend.rangePriceMin > filtersToSend.rangePriceMax ?
            filtersToSend.rangePriceMax :
            filtersToSend.rangePriceMin
        }
        onChange={e => handleFilters(e)}
        min={0}
      />
      <input
        name="rangePriceMax"
        type="number"
        placeholder="Precio maximo"
        // value={filtersToSend.rangePriceMax}
        value={
          filtersToSend.rangePriceMax < filtersToSend.rangePriceMin ?
            filtersToSend.rangePriceMin :
            filtersToSend.rangePriceMax
        }
        onChange={e => handleFilters(e)}
        min={0}
      />
      <input type="submit" value="Filtrar por precio" />
      <select name="color" onChange={e => handleFilters(e)}>
        <option value="blanco">Blanco</option>
        <option value="negro">Negro</option>
        <option value="amarillo">Amarillo</option>
      </select>
      <input type="submit" value="Filtrar por color" />
      {
        queriesFromReducer.category === "ropa" ?
          <div>
            <select name="sex" onChange={e => handleFilters(e)}>
              <option value="unisex">Unisex</option>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
            </select>
            <select name="talle" onChange={e => handleFilters(e)}>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
              <option value="xxl">XXL</option>
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