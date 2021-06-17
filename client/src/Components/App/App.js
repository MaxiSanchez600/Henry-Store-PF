// ! MODULES
import "../../Sass/Main.scss";
import {
  BrowserRouter,
  // Switch,
  Route,
  // Redirect
} from "react-router-dom";

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
import CompleteData from "../Authentication/CompleteData/CompleteData.jsx"
// ! COMPONENTS

// ? probar AUTH FIREBASE OTHER LINKS :: PENDING
// ! CONTENT
function App() {
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
              </div>
            </BrowserRouter>
        
        </FirebaseAppProvider>
      </Suspense>
    </div>
  );
}

export default App;