import React, { useEffect } from "react";
import $ from 'jquery'
import axios from "axios";

function HeartIcon({ id_product }) {

  // ! FUNCTIONS
  const handleChangex = (e) => {
    var id_user = localStorage.getItem('userlogged');

    // 'Body data'
    const New_Wish_Item = {
      "id_user": id_user,
      "id_product": id_product,
    }

    if (!e.target.classList[1]) {
      axios.post(`http://localhost:3001/wishlist`, New_Wish_Item)
        .then(res => {
          // console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      axios.delete(`http://localhost:3001/wishlist`,  { data: New_Wish_Item})
        .then(res => {
          // console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
    $(`#${e.target.id}`).toggleClass("is-active");
  }

  // ! CONTENT
  return (
    <div className="stage">
      <div id={id_product} className="heart" onClick={handleChangex}></div>
    </div>
  );
}

export default HeartIcon;
