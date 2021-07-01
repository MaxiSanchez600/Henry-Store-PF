import React, { useEffect } from 'react';

function WishList({ getMyWishList }) {

  // useEffect(() => {
  //   var id_user = localStorage.getItem('userlogged');
  //   getMyWishList(id_user)
  // }, [])

  // ! CONTENT
  return (<>
    <div className="WishList_Content">
      <div className="imageheart"><span className="iconify" data-icon="emojione:heart-decoration" data-inline="false"></span></div>
    </div>
  </>
  )
}

export default WishList
