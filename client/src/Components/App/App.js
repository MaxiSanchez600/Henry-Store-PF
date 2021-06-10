// ! MODULES
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import store from '../../Redux/store/index.js'
import firebaseConfig from '../../Config/firebase-config.js'
import { FirebaseAppProvider } from 'reactfire'
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