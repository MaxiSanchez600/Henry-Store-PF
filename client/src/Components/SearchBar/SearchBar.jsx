import React, { useState } from 'react';
import { connect } from "react-redux";
import { getAllFilteredProducts, getAllCaracteristics } from '../../Redux/actions/actionsProducts';
import { FaSearch } from "react-icons/fa"
import { MdClose } from "react-icons/md"

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
      setSearch(e.target.value);
      const removedPreviousFilters = removePreviousFilters();
      sendFiltersToActions({ ...removedPreviousFilters, [e.target.name]: e.target.value });
      getCaracteristicsFromActions({ [e.target.name]: e.target.value });
    }
  }

  function removePreviousFilters() {
    const { category, ...removedFilters } = { ...queriesFromReducer };
    caracteristicsFromReducer.forEach(caracteristic => {
      delete removedFilters[caracteristic.name_caracteristic];
    });
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

  return (
    <div className="content_SearchBar">
      <form className="searchbar_input" onSubmit={e => handleSubmit(e)}>
        <input
          className="input_search"
          name="tag"
          type="text"
          placeholder="Buscar productos, accesorios..."
          value={search}
          onChange={e => handleSearch(e)}
        />
        <button className="button_search" type="submit"><FaSearch /></button>
      </form>
      {
        search ?
          <div className="box_filter">
            <p className="filter_title_selected">{search}</p>
            <button className="button_filtered" name={search} onClick={e => closeSearchButton(e)} ><MdClose /></button>
          </div> : ""
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