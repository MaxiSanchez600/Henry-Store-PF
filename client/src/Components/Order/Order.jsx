import React, { useState } from 'react';
import { connect } from 'react-redux';

import { getAllFilteredProducts } from '../../Redux/actions/actionsProducts';
import "./Order.scss"

function Order({ queriesFromReducer, sendFiltersToActions }) {

  const [orderType, setOrderType] = useState("");
  const [orderDirection, setOrderDirection] = useState("");

  function handleOrder(e) {
    if (e.target.value !== "default") {
      setOrderType(e.target.name);
      setOrderDirection(e.target.value);
      sendFiltersToActions({ ...queriesFromReducer, orderType: e.target.name, orderDirection: e.target.value });
    }
    else closeOrderButton(e);
  }

  function closeOrderButton(e) {
    e.preventDefault();
    const filterToBeRemoved = document.getElementById(`filter_name_${e.target.name}`);
    console.log("filterToBeRemoved: ", filterToBeRemoved);
    if (filterToBeRemoved) filterToBeRemoved.value = "default";
    setOrderType("");
    setOrderDirection("");
    const { orderType, orderDirection, ...removedOrderQueries } = { ...queriesFromReducer };
    sendFiltersToActions({ ...removedOrderQueries });
  }

  return (
    <div className="order_container">
      <div className="order_filter">
        <h3 className="order_filter_title">
          Ordenar por:
          {/* <div></div> */}
        </h3>
        <select
          name="price"
          onChange={e => handleOrder(e)}
          id={`filter_name_orderType`}
          className="order_list_select"
        >
          <option value="default">Elige una opcion...</option>
          <option value="ASC">Menor precio</option>
          <option value="DESC">Mayor precio</option>
        </select>
      </div>
      {
        queriesFromReducer.orderType && queriesFromReducer.orderDirection ?
          <div className="order_box_filter">
            <p className="order_filter_title_selected">{`${queriesFromReducer.orderType}: ${queriesFromReducer.orderDirection}`}</p>
            <button
              name="orderType"
              onClick={e => closeOrderButton(e)}
              className="order_button_filtered"
            >x</button>
          </div> : ""
      }
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(Order);