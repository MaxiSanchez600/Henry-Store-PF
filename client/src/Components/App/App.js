// ! MODULES
import "../../Sass/Main.scss";
import {
  BrowserRouter,
  // Switch,
  Route,
  // Redirect
  Redirect
} from "react-router-dom";


import {config} from '../../Config/firebase-config.js'
import { FirebaseAppProvider } from 'reactfire'

// ! PAGES
import Home from "../../Pages/Home/Home";
import Product_Detail from "../../Pages/Product_Detail/Product_Detail";
import GeoLocation from "../../Components/GeoLocation/GeoLocation";
import React, {Suspense} from "react";
import "firebase/auth";
import "./App.scss"
import Cart from "../../Pages/Cart/Cart";
import CreateProduct from "../AdminPanel/CreateProduc/CreateProduct";
import SlideBar from "../AdminPanel/SlideBar/SlideBar";
import Analytics from "../AdminPanel/Analytics/Analytics";
import EditProduct from "../AdminPanel/EditProduct/EditProduct";

// !ACTIONS
import Users from "../AdminPanel/Users/Users";
import CompleteData from "../Authentication/CompleteData/CompleteData.jsx"
import Products from "../AdminPanel/Products/Products"

import {getUserLogin} from "../../Redux/actions/actionsUsers";
import GuardRoute from "./GuardRoute";
import { useGlobalContext } from "../../context"
import Sidebar from "../Sidebar/Sidebar.jsx"
import WorkingOnIt from "../WorkingOnIt/WorkingOnIt";

function App() {
  var userLogged = localStorage.getItem('userlogged');
  const { closeSidebar} = useGlobalContext();
  let isLogged=userLogged?true:false;
  let typeOfUser=localStorage.getItem("rol");

  return (
    <div className="App" onClick={closeSidebar}>
      <Suspense fallback={"Cargando..."}>
        <FirebaseAppProvider firebaseConfig={config}>
            <BrowserRouter>
              <Route exact path="/" component={Home} />
              {/* <Route exact path="/location" component={GeoLocation} /> */}
              <Route exact path="/item/:id" component={Product_Detail} />
              <Route exact path= '/cart' component= {Cart}/>
              <Route exact path="/profile" component={CompleteData} />
              <Route exact path="/working" component={WorkingOnIt}/>
              {(typeOfUser === "admin")&&
              <div >
              <Route path="/admin" component={SlideBar} />
              <Route  exact path="/admin" component={Analytics} />
              <Route  exact path="/admin/createProduct" component={CreateProduct} />
              <Route  exact path="/admin/users" component={Users}/>
              <Route  exact path="/admin/products" component={Products}/>
              <Route exact path="/admin/editProduct/:id" render={(props)=>(
              <EditProduct {...props} title='Editar producto'/>)}/>
              </div>
              }
            </BrowserRouter>
        </FirebaseAppProvider>
      </Suspense>
    </div>
  );
}

export default App;