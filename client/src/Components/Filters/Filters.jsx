import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  getAllFilteredProducts,
} from '../../Redux/actions/actionsProducts';

function Filters({
  queriesFromReducer,
  caracteristicsFromReducer,
  // getCaracteristicsFromActions,
  sendFiltersToActions
}) {

  // ! ***** FILTERS ****
  const [filtersToSend, setFiltersToSend] = useState({
    // type: "",
    // rangePriceMin: 0,
    // rangePriceMax: 0,
    // color: "",
  });

  function handleFilters(e) {
    setFiltersToSend({
      ...filtersToSend,
      [e.target.name]: e.target.value
    });
    if (!e.target.value) closeSelectedFilterButton(e);

    else sendFiltersToActions({ ...queriesFromReducer, [e.target.name]: e.target.value });

  }

  function closeSelectedFilterButton(e) {
    e.preventDefault();

    const idToBeRemoved = document.getElementById(`${e.target.name}`);
    if (idToBeRemoved) idToBeRemoved.value = "";

    delete queriesFromReducer[e.target.name];
    delete filtersToSend[e.target.name];

    setFiltersToSend({ ...filtersToSend });
    sendFiltersToActions({ ...queriesFromReducer });
    // setSelectedFilter("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendFiltersToActions({ ...queriesFromReducer });
  }

  // ! ****************** CONTENT ****************** */
  return <div className="content_Filters">
    <form onSubmit={e => handleSubmit(e)}>
      {
        Object.keys(filtersToSend).length ?
          <div className="container_box">
            {
              Object.keys(filtersToSend).map((filterName) => (
                <div key={filterName} className="box_filter" id={`${filterName}_${filtersToSend[filterName]}`}>
                  <p className="filter_title_selected">{`${filterName}: ${filtersToSend[filterName]}`}</p>
                  <button
                    className="button_filtered"
                    name={filterName}
                    onClick={e => closeSelectedFilterButton(e)}
                  >x</button>
                </div>
              ))
            }
          </div> : <div className="container_box"></div>
      }

      {/* PRECIO*/}
      <div className="name_filter">
        <h3 className="filter_title">Precio:<div className="title_stripe"></div></h3>
        <p className="range_price_subtitle">Desde: {filtersToSend.rangePriceMin}</p>
        <input
          id={`rangePriceMin`}
          className="range_price"
          name="rangePriceMin"
          type="number"
          placeholder="Precio minimo"
          value={filtersToSend.rangePriceMin}
          onChange={e => handleFilters(e)}
          min={0}
        />
        <p className="range_price_subtitle">Hasta: {filtersToSend.rangePriceMax}</p>
        <input
          id={`rangePriceMax`}
          className="range_price"
          name="rangePriceMax"
          type="number"
          placeholder="Precio maximo"
          value={filtersToSend.rangePriceMax}
          onChange={e => handleFilters(e)}
          min={0}
        />
      </div>
      {
        caracteristicsFromReducer.map(caracteristic => (
          <div className="name_filter" key={caracteristic.name_caracteristic}>
            <h3 className="filter_title">{`${caracteristic.name_caracteristic}:`}<div className="title_stripe"></div></h3>
            <select
              name={caracteristic.name_caracteristic}
              className="list_select"
              onChange={e => handleFilters(e)}
            >
              <option value="" className="select_options">Elige una opcion...</option>
              {
                caracteristic.values_caracteristic.map(value => (
                  <option value={value} key={value} className="select_options">{value}</option>
                ))
              }
            </select>
          </div>
        ))
      }
      {/* {
        queriesFromReducer.category === "Ropa" ?
          <div className="name_filter">
            <h3>Genero:</h3>
            <select className="list_select" name="genero" onChange={e => handleFilters(e)}>
              <option value="">Genero...</option>
              <option value="Unisex">Unisex</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
            </select>
            <h3>Talle:</h3>
            <select className="list_select" name="size" onChange={e => handleFilters(e)}>
              <option value="">Talle...</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div> : ""
      } */}
    </form>
  </div>
}

function mapStateToProps(state) {
  return {
    queriesFromReducer: state.products.queries,
    caracteristicsFromReducer: state.products.caracteristics,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendFiltersToActions: (allQueries) => dispatch(getAllFilteredProducts(allQueries))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);