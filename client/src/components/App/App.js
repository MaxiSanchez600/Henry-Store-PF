// ! MODULES
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// ! COMPONENTS
import Navbar from "../NavBar/NavBar";

// ! CONTENT
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {/* <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/recipes/new_recipe" component={Add_Recipe} />
          <Route exact path="/recipes/my_recipes" component={My_Recipes} />
          <Route exact path="/recipes/information/:id" component={Detail_Recipe} />

          <Route exact path="/diets" component={Diets} />
          <Route exact path="/diets/new_diet" component={Add_Diet} />
          <Route exact path="/diets/my_diets" component={My_Diets} />
          <Route exact path="/about" component={About} />
        </Switch> */}
      </BrowserRouter>
    </div>
  );
}

export default App;