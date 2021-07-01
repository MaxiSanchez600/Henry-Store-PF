import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from 'react-redux';
import { useUser } from "reactfire";
import { useDispatch } from 'react-redux';

import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
import logo from '../../Assets/Images/Logo_H_white.png'
import Modal from "../Modal/Modal";
// import FilterCategories from "../FilterCategories/FilterCategories";
import ForgotPassword from "../Authentication/ForgotPass/ForgotPassword";
import { useGlobalContext } from "../../context"
import Logos from "../../Assets/logos.json";
import { FaShoppingCart } from 'react-icons/fa'
import { IoEnter } from "react-icons/io5"
import { FaUserAlt } from "react-icons/fa"
import { URL_BASE } from '../../Config/index.js'
import { setCurrencyStore, getAllFilteredProducts } from "../../Redux/actions/actionsProducts";

// ! COMPONENTES
import "firebase/auth";
import axios from "axios";


const NavBar = ({ queriesFromReducer, sendFiltersToActions }) => {
  const dispatch = useDispatch();
  const dataUSerLogin = useSelector((state) => state.users.dataUSerLogin);
  const [ModalLogin, setModalLogin] = useState(false);
  const [ModalRegister, setModalRegister] = useState(false);
  const [ModalForgotPass, setModalForgotPass] = useState(false);
  const { openSidebar } = useGlobalContext();
  const { data: user } = useUser();
  const [currency, setCurrency] = useState([])
  const getCurrencies = () => {
    axios.get(URL_BASE + 'cart/getcurrency').then(value => {
      setCurrency(value.data)
    })
  }

  const actualCurrency = localStorage.getItem("currency");
  // const actualCurrencyName = localStorage.getItem("currencyname");

  useEffect(() => {
    getCurrencies()
    sendFiltersToActions({ ...queriesFromReducer, currency: actualCurrency });
  }, [actualCurrency])

  const onHandleChangeSelect = (e) => {
    console.log(e.target.options[e.target.options.selectedIndex].getAttribute("name"))
    localStorage.setItem("currencyname", (e.target.options[e.target.options.selectedIndex].getAttribute("name")))
    localStorage.setItem("currency", e.target.value)
    dispatch(setCurrencyStore({ value: e.target.value, name: e.target.options[e.target.options.selectedIndex].getAttribute("name") }))
    // console.log("localStorage.getItem('currency'): ", localStorage.getItem("currency"));
    sendFiltersToActions({ ...queriesFromReducer, currency: e.target.value });
  }
  // ! CONTENT
  return (
    <div className="contain_NavBar">
      <Modal isOpened={ModalLogin} onClose={() => setModalLogin(false)} >
        <Login isOpened={ModalLogin}
          loginClose={() => setModalLogin(false)}
          registerOpen={() => setModalRegister(true)}
          ForgotPassOpen={() => setModalForgotPass(true)} />
      </Modal>
      <Modal isOpened={ModalRegister} onClose={() => setModalRegister(false)}>
        <Register isOpened={ModalRegister}
          RegisterClose={() => setModalRegister(false)}
          LoginOpen={() => setModalLogin(true)}
        />
      </Modal>

      <Modal isOpened={ModalForgotPass} onClose={() => setModalForgotPass(false)}>
        <ForgotPassword isOpened={ModalForgotPass}
          forgotPassClose={() => setModalForgotPass(false)}
          LoginOpen={() => setModalLogin(true)}
        />
      </Modal>
      <Link className="left-box" to="/">
        <img className="logohenry" src={Logos[0].src_logo} alt="not" />
        {/* <p className="store_text">STORE</p> */}
      </Link>
      {/* <div className="left-box">
      </div> */}
      <div className="mid-box">
        <div className="links_container">
          <Link className="navbar_link" to="/home">Catálogo</Link>
          <a className="navbar_link" target="_blank" rel="noreferrer" href="https://soyhenry.com/webfullstack/">Carrera</a>
          <a className="navbar_link" target="_blank" rel="noreferrer" href="https://soyhenry.com/about-us">Nosotros</a>
        </div>
        {/* <FilterCategories /> */}
      </div>
      <div className="right-box">
        <div className="buttons-under-profile">
          <div className="currency_container">
            <p className="currency_text">$</p>
            <select onChange={onHandleChangeSelect} className="currency_select">
              {currency.map(element => ((localStorage.getItem("currency") === (element.currencyExChange + "")) ? <option selected="selected" name={element.currencyName}
                value={element.currencyExChange}>{element.currencyName}</option> : <option name={element.currencyName} value={element.currencyExChange}
                >{element.currencyName}</option>))}
            </select>
          </div>
          <div data-tip data-for="cart_tooltip_NavBar" className="navbar_cart">
            <Link className="shop_cart_link" to={'/home/cart'}><FaShoppingCart/></Link>
          </div>
          {!user &&
            //Botones de login y registro 
            <div className="user_buttons_container">
              <button className="user_button" onClick={() => setModalLogin(true)}>INGRESAR</button>
              <button className="user_button" id="buttonRegister" onClick={() => setModalRegister(true)}>REGISTRO</button>
            </div>
          }
        </div>
        <div className="profile-box">
          {user &&
            <div className="header_perfil">
              <span onMouseMove={openSidebar}>
                <img className="image-navbar" src={dataUSerLogin.image || logo} alt="not found" />
              </span>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    queriesFromReducer: state.products.queries,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendFiltersToActions: (allQueries) => dispatch(getAllFilteredProducts(allQueries)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);