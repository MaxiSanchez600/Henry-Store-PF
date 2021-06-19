import React, { useState } from 'react';
import { connect } from 'react-redux';

import { getAllFilteredProducts } from '../../Redux/actions/actionsProducts';

function Order({ queriesFromReducer, sendFiltersToActions }) {

  const [orderType, setOrderType] = useState("");
  const [orderDirection, setOrderDirection] = useState("");

  function handleOrder(e) {
    console.log("queriesFromReducer: ", queriesFromReducer);
    if (e.target.value) {
      setOrderType(e.target.name);
      setOrderDirection(e.target.value);
      sendFiltersToActions({ ...queriesFromReducer, orderType: e.target.name, orderDirection: e.target.value });
    }
    else closeOrderButton(e);
  }

  function closeOrderButton(e) {
    e.preventDefault();
    setOrderType("");
    setOrderDirection("");
    const { orderType, orderDirection, ...removedOrderQueries } = { ...queriesFromReducer };
    sendFiltersToActions({ ...removedOrderQueries });
  }

  return (
    <div>
      {
        orderType && orderDirection ?
          <div>
            <p>{`${orderType}: ${orderDirection}`}</p>
            <button
              name={orderType}
              onClick={e => closeOrderButton(e)}
            >x</button>
          </div> : ""
      }
      <select name="price" onChange={e => handleOrder(e)}>
        <option value="">Ordenar de...</option>
        <option value="ASC">Menor a mayor precio</option>
        <option value="DESC">Mayor a menor precio</option>
      </select>
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