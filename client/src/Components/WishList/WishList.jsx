import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMyWishList } from '../../Redux/actions/actionsProducts';
import HeartIcon from '../WishList/HeartIcon';
import { Link } from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar'

function WishList({ getMyWishList, MyWishList }) {

  let currencyactual = localStorage.getItem('currency')
  let currencyactualname = localStorage.getItem('currencyname')
  let id_user = localStorage.getItem('userlogged')


  useEffect(() => {
    getMyWishList(id_user);
  }, [])


  const onClickHandler = event => {
    window.location.reload(false);
  }

  // ! CONTENT   
  return <div className="cards_container_products">
    <div className="WishList_Content">
      <h2> MIS FAVORITOS:</h2>
    </div>

    <div className="all_Cards">
      {
        MyWishList && MyWishList.map((product) => {
          return (<div className={product.unit_stock > 0 ? "product_card" : "product_card_disabled"}>
            <button onClick={onClickHandler}> <HeartIcon id_product={product.id_product} added={MyWishList?.filter(e => e.id_product == product.id_product).length !== 0 ? true : false} /> </button>
            <img src={product.Images.length ? product.Images[0].name_image : ""} alt="" className="product_image" id={product.index} />
            <div className="product_name">
              {product.name}
              <div className="product_stripe"></div>
            </div>
            <div className="product_price">
              <h5 className="product_number">{product.price*currencyactual}</h5>
              <h5 className="product_usd"> {currencyactualname}</h5>
            </div>
            <Link className="link" to={`/home/item/${product.id_product}`} key={product.id_product}>
              <button className="button_detail"><h4>Detalle</h4></button>
            </Link>
          </div>
          )
        })}
    </div>
    <Sidebar/>
  </div >
}

function mapStateToProps(state) {
  return {
    MyWishList: state.products.wishlist,

  }
}

function mapDispatchToProps(dispatch) {
  return {
    getMyWishList: (Id_User) => dispatch(getMyWishList(Id_User)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
