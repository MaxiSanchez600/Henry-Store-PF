// ! MODULES
import "../../Sass/Main.scss";
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import store from '../../Redux/store/index.js'
import {config} from '../../Config/firebase-config.js'
import { FirebaseAppProvider } from 'reactfire'

// ! PAGES
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
        <FirebaseAppProvider firebaseConfig={config}>
          <Provider store={store}>
            <BrowserRouter>
              <NavBar/>
            <h1>Henry Store!</h1>
            </BrowserRouter>
          </Provider>
        </FirebaseAppProvider>
      </Suspense>
    </div>
  );
}

export default App;