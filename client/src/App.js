import './App.css';
import { Provider } from "react-redux";
import store from "./store/index";

function App() {
  return (
    <Provider store = {store}>
      <div className="App">
        <h1>Henry Store</h1>
      </div>
    </Provider>
  );
}

export default App;
