import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMyWishList } from '../../Redux/actions/actionsProducts';

// import HeartIcon from './HeartIcon'
import './js/main'

function WishList( { getMyWishList } ) {

useEffect(() => {
  var id_user = localStorage.getItem('userlogged');
  getMyWishList(id_user)
}, [])

  // ! CONTENT
  return (
    <div className="WishList_Content">
      <main class="cd-main container margin-top-xxl">
        <div class="text-component text-center">
          <h1>Add to Cart Interaction</h1>
          <p class="flex flex-wrap flex-center flex-gap-xxs">
            <a href="#0" class="cd-add-to-cart js-cd-add-to-cart" data-price="25.99">Add To Cart</a>
          </p>
        </div>
      </main>

      <div class="cd-cart cd-cart--empty js-cd-cart">
        <a href="#0" class="cd-cart__trigger text-replace">
          Cart
          <ul class="cd-cart__count">
            <li>0</li>
            <li>0</li>
          </ul>
        </a>

        <div class="cd-cart__content">
          <div class="cd-cart__layout">
            <header class="cd-cart__header">
              <h2>Cart</h2>
              <span class="cd-cart__undo">Item removed. <a href="#0">Undo</a></span>
            </header>

            <div class="cd-cart__body">
              <ul>

              </ul>
            </div>

            <footer class="cd-cart__footer">
              <a href="#0" class="cd-cart__checkout">
                <em>Checkout - $<span>0</span>
                  <svg class="icon icon--sm" viewBox="0 0 24 24"><g fill="none" stroke="currentColor"><line strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="3" y1="12" x2="21" y2="12" /><polyline stroke-width="2" strokeLinecap="round" strokeLinejoin="round" points="15,6 21,12 15,18 " /></g>
                  </svg>
                </em>
              </a>
            </footer>
          </div>
        </div>
      </div>
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
      // getProducts: products_list =>   dispatch(getProducts(products_list)),
      getMyWishList: (WishItem) => dispatch(getMyWishList(WishItem))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
