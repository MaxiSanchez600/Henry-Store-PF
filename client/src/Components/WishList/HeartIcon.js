import React, { useEffect } from "react";
import $ from 'jquery'
import axios from "axios";
import {workspace} from '../../Config/index'

function HeartIcon({ id_product, added }) {

  // ! FUNCTIONS
  const handleChangex = (e) => {
    var id_user = localStorage.getItem('userlogged');

    // 'Body data'
    const New_Wish_Item = {
      "id_user": id_user,
      "id_product": id_product,
    }

    if (!e.target.classList[1]) {
      axios.post(`${workspace}/wishlist`, New_Wish_Item)
        .then(res => {
          // console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      axios.delete(`${workspace}/wishlist`,  { data: New_Wish_Item})
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
      <div id={id_product} className={added ? "heart is-active" : "heart"} onClick={handleChangex}></div>
    </div>
  );
}

export default HeartIcon;
