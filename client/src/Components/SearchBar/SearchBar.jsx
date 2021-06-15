import React, { useState } from 'react';
import { connect } from "react-redux";
import { getAllFilteredProducts } from '../../Redux/actions/actions';

const SearchBar = ({ queriesFromReducer, sendFiltersToActions }) => {

  const [search, setSearch] = useState("");

  function handleSearch(e) {
    setSearch(e.target.value);
    if (!e.target.value) {
      const { tag, ...removedTagQuery } = { ...queriesFromReducer };
      sendFiltersToActions({ ...removedTagQuery });
    }

    // else if (e.target.value === " ") {
    //   setSearch(e.target.value);

    // }
    else sendFiltersToActions({ ...queriesFromReducer, [e.target.name]: e.target.value });
  }

  function closeSearchButton(e) {
    e.preventDefault();
    setSearch("");
    const { tag, ...removedTagQuery } = { ...queriesFromReducer };
    sendFiltersToActions({ ...removedTagQuery });
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
        <button className="button_search" type="submit"><span class="iconify" data-icon="flat-color-icons:search" data-inline="false"></span></button>
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
    queriesFromReducer: state.queries
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendFiltersToActions: (allQueries) => dispatch(getAllFilteredProducts(allQueries))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);