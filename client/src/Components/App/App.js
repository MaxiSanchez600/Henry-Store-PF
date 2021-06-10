// ! MODULES
import "./App.scss";
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import store from '../../Redux/store/index.js'
import firebaseConfig from '../../Config/firebase-config.js'
import { FirebaseAppProvider } from 'reactfire'

// ! PAGES
import Product_Detail from '../../Pages/Product_Detail/Product_Detail'
import Registration from '../../Pages/Registration/Registration'
import Home from "../../Pages/Home/Home";
import Login from '../../Pages/Login/Login'

// ! CONTENT
function App() {
  return (
    <div className="App">
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <Provider store={store}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/registration" component={Registration} />
              <Route exact path="/item/:id" component={Product_Detail} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </FirebaseAppProvider>
    </div>
  );
}

export default App;