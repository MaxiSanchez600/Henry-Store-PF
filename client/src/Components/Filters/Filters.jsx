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
  //   size: "",
  // });

  // const [selectedFilter, setSelectedFilter] = useState("");

  function handleFilters(e) {
    // setSelectedFilter(e.target.name);
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
    if (!queriesFromReducer.category) {

    }
    const idToBeRemoved = document.getElementById(`${e.target.name}`);
    if (idToBeRemoved) {
      idToBeRemoved.value = "";
    }
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
      <div className="container_box">
        {
          Object.keys(filtersToSend).map((filterName) => (
            <div key={filterName} className="box_filter">
              <p>{`${filterName}: ${filtersToSend[filterName]}`}</p>
              <button
                className="button_filtered"
                name={filterName}
                onClick={e => closeSelectedFilterButton(e)}
              >x</button>
            </div>
          ))
        }
      </div>
      {/* SUBCATEGORIA*/}
      <div className="name_filter">
        <h3>Subcategoria:</h3>
        <select className="list_select" name="type" onChange={e => handleFilters(e)}>
          <option value="">Subcategorias...</option>
          <option value="Buzo">Buzo</option>
          <option value="Cuaderno">Cuaderno</option>
          <option value="Gorra">Gorra</option>
          <option value="Lentes">Lentes</option>
          <option value="Remera">Remera</option>
          <option value="Taza">Taza</option>
          <option value="Tecnologia">Tecnologia</option>
        </select>
      </div>
      {/* <input type="submit" value="Filtrar por tipo" /> */}

      {/* PRECIO*/}
      <div className="name_filter">
        <h3>Precio:</h3>
        <input
          id={`rangePriceMin`}
          className="range_price"
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
          id={`rangePriceMax`}
          className="range_price"
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
      </div>
      {/* <input type="submit" value="Filtrar por precio" /> */}

      {/* COLOR*/}
      <div className="name_filter"> <h3>Color Principal:</h3>
        <select className="list_select" name="color" onChange={e => handleFilters(e)}>
          <option value="">Color...</option>
          <option value="Blanco">Blanco</option>
          <option value="Negro">Negro</option>
          <option value="Amarillo">Amarillo</option>
        </select>
      </div>
      {/* <input type="submit" value="Filtrar por color" /> */}
      {
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
      }
    </form>
  </div>
}

function mapStateToProps(state) {
  return {
    queriesFromReducer: state.products.queries
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendFiltersToActions: (allQueries) => dispatch(getAllFilteredProducts(allQueries))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);