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
import CreateProduct from "../AdminPanel/CreateProduc/CreateProduct";
import SlideBar from "../AdminPanel/SlideBar/SlideBar";
import Analytics from "../AdminPanel/Analytics/Analytics";
import Users from "../AdminPanel/Users/Users";
import CompleteData from "../Authentication/CompleteData/CompleteData.jsx"
import Products from "../AdminPanel/Products/Products"

import {firebase} from "../../Config/firebase-config";
import { useDispatch, useSelector } from 'react-redux';
import {getUserLogin} from "../../Redux/actions/actionsUsers";
// ! COMPONENTS

// ? probar AUTH FIREBASE OTHER LINKS :: PENDING
// ! CONTENT
function App() {
  // const [stateUser, setStateUser] = useState(false);
  // const dataUSerLogin=useSelector((state)=>state.users.dataUSerLogin);
  // let user = firebase.auth().currentUser;
  // const dispatch = useDispatch();

  //   if(dataUSerLogin.length!=={} && stateUser===false){
  //     console.log("entro user")
  //     dispatch(getUserLogin(user.uid))
  //     setStateUser(true);
  //   }
 

  return (
    <div className="App">
      <Suspense fallback={"Cargando..."}>
        <FirebaseAppProvider firebaseConfig={config}>
            <BrowserRouter>
              <Route exact path="/" component={Home} />
              <Route exact path="/location" component={GeoLocation} />
              <Route exact path="/item/:id" component={Product_Detail} />
              <Route exact path="/profile" component={CompleteData} />
              <div className='adminContainer'>
                <Route path="/admin" component={SlideBar} />
                <Route exact path="/admin" component={Analytics} />
                <Route path="/admin/createProduct" component={CreateProduct} />
                <Route path="/admin/users" component={Users}/>
                <Route path="/admin/products" component={Products}/>
              </div>
            </BrowserRouter>
        
        </FirebaseAppProvider>
      </Suspense>
   
    </div>
  );
}

export default App;