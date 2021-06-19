import React, { useState } from 'react';
import { connect } from "react-redux";
import {
  getAllFilteredProducts,
  getAllCaracteristics
} from '../../Redux/actions/actionsProducts';

const SearchBar = ({
  queriesFromReducer,
  caracteristicsFromReducer,
  getCaracteristicsFromActions,
  sendFiltersToActions
}) => {

  const [search, setSearch] = useState("");

  function handleSearch(e) {

    if (!e.target.value) closeSearchButton(e);

    else {
      console.log("handleSearch -> e.target.value: ", e.target.value);
      setSearch(e.target.value);
      const removedPreviousFilters = removePreviousFilters();
      sendFiltersToActions({ ...removedPreviousFilters, [e.target.name]: e.target.value });
      getCaracteristicsFromActions({ [e.target.name]: e.target.value });
    }
  }

  function removePreviousFilters() {
    const { category, ...removedFilters } = { ...queriesFromReducer };
    // console.log("removePreviousFilters -> filters to be removed: ", removedFilters);
    caracteristicsFromReducer.forEach(caracteristic => {
      delete removedFilters[caracteristic.name_caracteristic];
    });
    // console.log("removePreviousFilters -> removedFilters: ", removedFilters);
    return { ...removedFilters };
  }

  function closeSearchButton(e) {
    e.preventDefault();
    setSearch("");
    const removedPreviousFilters = removePreviousFilters();
    const { tag, ...removedTagQuery } = { ...removedPreviousFilters };
    sendFiltersToActions({ ...removedTagQuery });
    getCaracteristicsFromActions();
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendFiltersToActions({ ...queriesFromReducer });
  }

  // ! CONTENT
  return (
    <div className="content_SearchBar">
      <form onSubmit={e => handleSubmit(e)}>
        <input
          className="input_search"
          name="tag"
          type="text"
          placeholder="Buscar productos, accesorios..."
          value={search}
          onChange={e => handleSearch(e)}
        />
        <button className="button_search" type="submit"><span className="iconify" data-icon="flat-color-icons:search" data-inline="false"></span></button>
      </form>
      {
        search ?
          <div>
            <p>Buscar por: {search}</p>
            <button
              name={search}
              onClick={e => closeSearchButton(e)}
            >x</button>
          </div> :
          ""
      }
    </div>
  );
};

function mapStateToProps(state) {
  return {
    queriesFromReducer: state.products.queries,
    caracteristicsFromReducer: state.products.caracteristics,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendFiltersToActions: (allQueries) => dispatch(getAllFilteredProducts(allQueries)),
    getCaracteristicsFromActions: (tag) => dispatch(getAllCaracteristics(tag)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);