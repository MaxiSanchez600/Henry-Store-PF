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
  //   sex: "",
  //   talle: "",
  // });

  // const [selectedFilter, setSelectedFilter] = useState("");

  function handleFilters(e) {
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

  // ! ****************** CONTENT ****************** */
  return <div className="content_Filters">
    <form onSubmit={e => handleSubmit(e)}>
      {
        Object.keys(filtersToSend).map((filterName) => (
          <div key={filterName} className="box_filter">
            <p>{`${filterName}: ${filtersToSend[filterName]}`}</p>
            <button
              name={filterName}
              onClick={e => closeSelectedFilterButton(e)}
            >X</button>
          </div>
        ))
      }
      {/* SUBCATEGORIA*/}
      <div className="name_filter"><h3>Subcategoria:</h3>
        <select className="list_select" name="type" onChange={e => handleFilters(e)}>
          <option value="buso">Buso</option>
          <option value="cuaderno">Cuaderno</option>
          <option value="gorra">Gorra</option>
          <option value="lentes">Lentes</option>
          <option value="remera">Remera</option>
          <option value="taza">Taza</option>
          <option value="tecnologia">Tecnologia</option>
        </select>
      </div>
      {/* <input type="submit" value="Filtrar por tipo" /> */}

      {/* PRECIO*/}
      <div className="name_filter"><h3>Precio:</h3>
        <input
          className="range_price"
          name="rangePriceMin"
          type="number"
          placeholder="Mínime"
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
          className="range_price"
          name="rangePriceMax"
          type="number"
          placeholder="Máxime"
          value={filtersToSend.rangePriceMax}
          // value={
          //   filtersToSend.rangePriceMax < filtersToSend.rangePriceMin ?
          //     filtersToSend.rangePriceMin :
          //     filtersToSend.rangePriceMax
          // }
          onChange={e => handleFilters(e)}
          min={0}
        />
      </div>
      {/* <input type="submit" value="Filtrar por precio" /> */}

    {/* COLOR*/}
      <div className="name_filter"> <h3>Color Principal:</h3>
        <select className="list_select" name="color" onChange={e => handleFilters(e)}>
          <option value="blanco">Blanco</option>
          <option value="negro">Negro</option>
          <option value="amarillo">Amarillo</option>
        </select>
      </div>
      {/* <input type="submit" value="Filtrar por color" /> */}
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
  </div>
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