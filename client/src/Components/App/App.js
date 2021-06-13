// ! MODULES
import "../../Sass/Main.scss";
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import store from '../../Redux/store/index.js'
import {config} from '../../Config/firebase-config.js'
import { FirebaseAppProvider } from 'reactfire'

// ! PAGES
import Home from "../../Pages/Home/Home";
import { Suspense } from "react";
import "firebase/auth";

// ! COMPONENTS

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
            </BrowserRouter>
          </Provider>
        </FirebaseAppProvider>
      </Suspense>
    </div>
  );
}

export default App;