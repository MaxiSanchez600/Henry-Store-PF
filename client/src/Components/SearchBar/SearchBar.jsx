import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { getAllFilteredProducts, getAllCaracteristics } from '../../Redux/actions/actionsProducts';
import { FaSearch } from "react-icons/fa"

const SearchBar = ({
  queriesFromReducer,
  caracteristicsFromReducer,
  getCaracteristicsFromActions,
  sendFiltersToActions
}) => {

  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!queriesFromReducer.tag) {
      setError("");
    }
  }, [queriesFromReducer.tag]);

  function handleSearch(e) {

    if (!e.target.value) {
      setError("");
      closeSearchButton(e);
    }

    else if (e.target.value && e.target.value.length < 37) {
      setError("");
      setSearch(e.target.value);
      const removedPreviousFilters = removePreviousFilters();
      sendFiltersToActions({ ...removedPreviousFilters, [e.target.name]: e.target.value });
      getCaracteristicsFromActions({ [e.target.name]: e.target.value });
    }

    else if (e.target.value && e.target.value.length === 37) {
      setSearch(e.target.value);
      setError("No creemos que exista algo asi en el universo, respira y reformula tu busqueda :)");
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
    const filterToBeRemoved = document.getElementById(`filter_name_${e.target.name}`);
    if (filterToBeRemoved) filterToBeRemoved.value = "";
    setSearch("");
    const removedPreviousFilters = removePreviousFilters();
    const { tag, ...removedTagQuery } = { ...removedPreviousFilters };
    sendFiltersToActions({ ...removedTagQuery });
    delete queriesFromReducer[e.target.name];
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendFiltersToActions({ ...queriesFromReducer });
  }

  return (
    <div className="content_SearchBar">
      <form className="searchbar_input" onSubmit={e => handleSubmit(e)}>
        <input
          id={`filter_name_tag`}
          className={error ? "input_search search_error" : "input_search"}
          name="tag"
          type="text"
          placeholder="Buscar productos, accesorios..."
          value={queriesFromReducer.tag ? search : e => handleSearch(e)}
          onChange={e => handleSearch(e)}
        />
        <button className="button_search" type="submit"><FaSearch /></button>
      </form>
      {
        !error ? "" : <p className="error_message">{error}</p>
      }
      {/* <p>{queriesFromReducer.tag.length}</p> */}
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