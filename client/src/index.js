import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App/App";
import { Provider } from 'react-redux'
import store from "./Redux/store/index"
import { AppProvider } from './context';
import {getUserLogin} from "./Redux/actions/actionsUsers";

var userLogged = localStorage.getItem('userlogged');

  if(userLogged){
    store.dispatch(getUserLogin(userLogged))
  }

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppProvider>
      <App />
      </AppProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
