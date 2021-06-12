// ! MODULES
import "../../Sass/Main.scss";
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import store from '../../Redux/store/index.js'
import firebaseConfig from '../../Config/firebase-config.js'
import { FirebaseAppProvider } from 'reactfire'

// ! PAGES
import Product_Detail from '../../Pages/Product_Detail/Product_Detail'
import Home from "../../Pages/Home/Home";
import NavBar from "../NavBar/NavBar";
import { Suspense } from "react";
import "firebase/auth";

// ! COMPONENTS
// import Navbar from "../NavBar/NavBar";

// ! CONTENT
function App() {
  return (
    <div className="App">
      <Suspense fallback={"Cargando..."}>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <Provider store={store}>
            <BrowserRouter>
              <Route exact path="/" component={Home} />
            </BrowserRouter>
          </Provider>
        </FirebaseAppProvider>
      </Suspense>
    </div>
  );
}

export default App;