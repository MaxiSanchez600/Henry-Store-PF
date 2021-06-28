import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
import logo from '../../Assets/Images/Logo_H_white.png'
import Modal from "../Modal/Modal";
import FilterCategories from "../FilterCategories/FilterCategories";
import SearchBar from "../SearchBar/SearchBar";
import ForgotPassword from "../Authentication/ForgotPass/ForgotPassword";
import { useSelector } from 'react-redux';
import { useUser } from "reactfire";
import { useGlobalContext } from "../../context"
import henry from "../../Assets/Images/new_logo.png"
import { FaShoppingCart } from 'react-icons/fa'
import { IoEnter } from "react-icons/io5"
import { FaUserAlt } from "react-icons/fa"
import { URL_BASE } from '../../Config/index.js'
import { useDispatch } from 'react-redux';
import { setCurrencyStore } from "../../Redux/actions/actionsProducts";

// ! COMPONENTES
import "firebase/auth";
import axios from "axios";


const NavBar = () => {
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

  useEffect(() => {
    getCurrencies()
  }, [])

  const onHandleChangeSelect = (e) => {
    console.log(e.target.options[e.target.options.selectedIndex].getAttribute("name"))
    localStorage.setItem("currencyname", (e.target.options[e.target.options.selectedIndex].getAttribute("name")))
    localStorage.setItem("currency", e.target.value)
    dispatch(setCurrencyStore({ value: e.target.value, name: e.target.options[e.target.options.selectedIndex].getAttribute("name") }))

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
        <img className="logohenry" src={henry} alt="not" />
        <p className="store_text">STORE</p>
      </Link>
      {/* <div className="left-box">
      </div> */}
      <div className="mid-box">
        <SearchBar />
        <FilterCategories />
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
            <Link className="shop_cart_link" to={'/home/cart'}><FaShoppingCart size="40px" /></Link>
          </div>
          {!user &&
            //Botones de login y registro 
            <div className="user_buttons_container">
              <button className="user_button" onClick={() => setModalLogin(true)}>INGRESAR <IoEnter /></button>
              <button className="user_button" id="buttonRegister" onClick={() => setModalRegister(true)}>REGISTRO <FaUserAlt /></button>
            </div>
          }
        </div>
        <div className="profile-box">
          {user &&
            <div className="header_perfil">
              <span onMouseMove={openSidebar}>
                <h2>{dataUSerLogin.username}</h2>
              </span>
              <span onMouseMove={openSidebar}>
                <img className="image" src={dataUSerLogin.image || logo} alt="not found" />
              </span>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default NavBar;
