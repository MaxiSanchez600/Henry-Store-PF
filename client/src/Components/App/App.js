// ! MODULES
import "../../Sass/Main.scss";
import {
  BrowserRouter,
  // Switch,
  Route,
  Redirect
} from "react-router-dom";

import React,{useState,useEffect}  from "react";
import {config} from '../../Config/firebase-config.js'
import { FirebaseAppProvider } from 'reactfire'

// ! PAGES
import Home from "../../Pages/Home/Home";
import Product_Detail from "../../Pages/Product_Detail/Product_Detail";
import GeoLocation from "../../Components/GeoLocation/GeoLocation";
import { Suspense } from "react";
import "firebase/auth";
import "./App.scss"
import Cart from "../../Pages/Cart/Cart";
import CreateProduct from "../AdminPanel/CreateProduc/CreateProduct";
import SlideBar from "../AdminPanel/SlideBar/SlideBar";
import Analytics from "../AdminPanel/Analytics/Analytics";
import Users from "../AdminPanel/Users/Users";
import CompleteData from "../Authentication/CompleteData/CompleteData.jsx"
import Products from "../AdminPanel/Products/Products"
import { useDispatch, useSelector } from 'react-redux';
import {getUserLogin} from "../../Redux/actions/actionsUsers";
import GuardRoute from "./GuardRoute";

function App() {

  const dispatch = useDispatch();
  var userLogged = localStorage.getItem('userlogged');
  const dataUSerLogin=useSelector((state)=>state.users.dataUSerLogin);

  let isLogged=userLogged?true:false;
  let typeOfUser=dataUSerLogin.role;

  useEffect(() => {
   if(userLogged){
     dispatch(getUserLogin(userLogged))
   }
  }, [userLogged]);

  
  return (
    <div className="App">
      <Suspense fallback={"Cargando..."}>
        <FirebaseAppProvider firebaseConfig={config}>
            <BrowserRouter>
              <GuardRoute typeRoute={"public"} exact path="/" component={Home} />
              <GuardRoute typeRoute={"public"}  typeOfUser={typeOfUser} exact path="/location" component={GeoLocation} />
              <GuardRoute typeRoute={"public"}  typeOfUser={typeOfUser} exact path="/item/:id" component={Product_Detail} />
              <GuardRoute typeRoute={"public"}  typeOfUser={typeOfUser} exact path= '/cart' component= {Cart}/>
              <div className='adminContainer'>
                <GuardRoute typeRoute={"public"} isLogged={isLogged} typeOfUser={typeOfUser} exact path="/profile" component={CompleteData} />
                <GuardRoute typeRoute={"private"} isLogged={isLogged} typeOfUser={typeOfUser} path="/admin" component={SlideBar} />
                <GuardRoute typeRoute={"private"} isLogged={isLogged} typeOfUser={typeOfUser} exact path="/admin" component={Analytics} />
                <GuardRoute typeRoute={"private"} isLogged={isLogged} typeOfUser={typeOfUser} path="/admin/createProduct" component={CreateProduct} />
                <GuardRoute typeRoute={"private"} isLogged={isLogged} typeOfUser={typeOfUser} path="/admin/users" component={Users}/>
                <GuardRoute typeRoute={"private"} isLogged={isLogged} typeOfUser={typeOfUser} path="/admin/products" component={Products}/>
              </div>
            </BrowserRouter>
        </FirebaseAppProvider>
      </Suspense>
   
    </div>
  );
}

export default App;