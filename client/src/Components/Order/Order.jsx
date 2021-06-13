import React, { useState } from 'react';
import { connect } from 'react-redux';

import { getAllFilteredProducts } from '../../Redux/actions/actions';

function Order({ queriesFromReducer, sendFiltersToActions }) {

  const [orderProp, setOrderProp] = useState("");
  const [orderType, setOrderType] = useState("");

  function handleOrder(e) {
    // console.log("e.target.name: ", e.target.name);
    // console.log("e.target.value: ", e.target.value);
    setOrderProp(e.target.name);
    setOrderType(e.target.value);
    sendFiltersToActions({ ...queriesFromReducer, orderProp: e.target.name, orderType: e.target.value });
  }

  function closeOrderButton(e) {
    e.preventDefault();
    setOrderProp("");
    setOrderType("");
    const { orderProp, orderType, ...removedORderQueries } = { ...queriesFromReducer };
    sendFiltersToActions({ ...removedORderQueries });
  }

  return (
    <div>
      {
        orderProp && orderType ?
          <div>
            <p>{`${orderProp}: ${orderType}`}</p>
            <button
              name={orderProp}
              onClick={e => closeOrderButton(e)}
            >x</button>
          </div> : ""
      }
      <select name="price" onChange={e => handleOrder(e)}>
        <option value="ASC">Menor a mayor precio</option>
        <option value="DESC">Mayor a menor precio</option>
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