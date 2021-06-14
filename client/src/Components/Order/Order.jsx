import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Order.scss'

import { getAllFilteredProducts } from '../../Redux/actions/actions';

function Order({ queriesFromReducer, sendFiltersToActions }) {

  const [orderType, setOrderType] = useState("");
  const [orderDirection, setOrderDirection] = useState("");

  function handleOrder(e) {
    setOrderType(e.target.name);
    setOrderDirection(e.target.value);
    sendFiltersToActions({ ...queriesFromReducer, orderType: e.target.name, orderDirection: e.target.value });
  }

  function closeOrderButton(e) {
    e.preventDefault();
    setOrderType("");
    setOrderDirection("");
    const { orderType, orderDirection, ...removedORderQueries } = { ...queriesFromReducer };
    sendFiltersToActions({ ...removedORderQueries });
  }

  return (
    <div className="content_Order">
      {
        orderType && orderDirection ?
          <div className="container_box">
            <div className="box_filter">
              <p>{`${orderType}: ${orderDirection}`}</p>
              <button
                className="button_filtered"
                name={orderType}
                onClick={e => closeOrderButton(e)}
              >x</button>
            </div> </div> : ""
      }
        <h3 >Ordenar Precio:</h3>
      <select name="price" onChange={e => handleOrder(e)} className="list_select">
        <option value="ASC">Menor precio</option>
        <option value="DESC">Mayor precio</option>
      </select>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Order);