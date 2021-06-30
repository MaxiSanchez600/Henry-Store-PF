import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMyWishList } from '../../Redux/actions/actionsProducts';

// import HeartIcon from './HeartIcon'

function WishList( { getMyWishList } ) {

useEffect(() => {
  var id_user = localStorage.getItem('userlogged');
  getMyWishList(id_user)
}, [])

  // ! CONTENT
  return (
    <div className="WishList_Content">
     
    </div>
  )
}

function mapStateToProps(state) {
  return {
      WishList: state.products.wishlist,
  }
}

function mapDispatchToProps(dispatch) {
  return {
      getMyWishList: (WishItem) => dispatch(getMyWishList(WishItem))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
