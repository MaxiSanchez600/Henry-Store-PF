// ! MODULES
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import store from '../../Redux/store/index.js'
import firebaseConfig from '../../Config/firebase-config.js'
import { FirebaseAppProvider } from 'reactfire'

// ! COMPONENTS
// import Navbar from "../NavBar/NavBar";

// ! CONTENT
function App() {
  return (
    <div className="App">
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <Provider store={store}>
          <BrowserRouter>
          <h1>Henry Store</h1>
          </BrowserRouter>
        </Provider>
      </FirebaseAppProvider>
    </div>
  );
}

export default App;