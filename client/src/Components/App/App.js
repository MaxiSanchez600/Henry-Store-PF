// ! MODULES
import "../../Sass/Main.scss";
import { Provider, useDispatch} from 'react-redux'
import {
  BrowserRouter,
  // Switch,
  Route,
  // Redirect
  
} from "react-router-dom";
import store from '../../Redux/store/index.js'
import {config} from '../../Config/firebase-config.js'
import { FirebaseAppProvider } from 'reactfire'

// ! PAGES
import Home from "../../Pages/Home/Home";
import Product_Detail from "../../Pages/Product_Detail/Product_Detail";
import GeoLocation from "../../Components/GeoLocation/GeoLocation";
import React, {Suspense} from "react";
import "firebase/auth";


// ! COMPONENTS
import CreateProduct from "../AdminPanel/CreateProduc/CreateProduct";
import SlideBar from "../AdminPanel/SlideBar/SlideBar";
import Analytics from "../AdminPanel/Analytics/Analytics";
import EditProduct from "../AdminPanel/EditProduct/EditProduct";

// !ACTIONS

// ? probar AUTH FIREBASE OTHER LINKS :: PENDING
// ! CONTENT
function App() {

  return (
    <div className="App">
      <Suspense fallback={"Cargando..."}>
        <FirebaseAppProvider firebaseConfig={config}>
          <Provider store={store}>
            <BrowserRouter>
              <Route exact path="/" component={Home} />
              <Route exact path="/location" component={GeoLocation} />
              <Route exact path="/item/:id" component={Product_Detail} />
              <div className='adminContainer'>
                <Route path="/admin" component={SlideBar} />
                <Route exact path="/admin" component={Analytics} />
                <Route exact path="/admin/editProduct">
                  <EditProduct />
                </Route>                
                <Route path="/admin/createProduct">
                  <CreateProduct editIsActive={false}/>
                </Route>
              </div>
            </BrowserRouter>
          </Provider>
        </FirebaseAppProvider>
      </Suspense>
    </div>
  );
}

export default App;