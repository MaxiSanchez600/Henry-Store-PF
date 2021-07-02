// ! MODULES
import "../../Sass/Main.scss";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {config} from '../../Config/firebase-config.js'
import { FirebaseAppProvider } from 'reactfire'
import React, {Suspense} from "react";

// ! PAGES
import Landing from "../../Pages/Landing/Landing";
import Home from "../../Pages/Home/Home";
import Product_Detail from "../../Pages/Product_Detail/Product_Detail";
import Checkout from "../../Pages/Checkout/Checkout.jsx";
import "firebase/auth";
import "./App.scss"
import Cart from "../../Pages/Cart/Cart";
import CreateProduct from "../AdminPanel/CreateProduc/CreateProduct";
import SlideBar from "../AdminPanel/SlideBar/SlideBar";
import Analytics from "../AdminPanel/Analytics/Analytics";
import EditProduct from "../AdminPanel/EditProduct/EditProduct";
import CartSuccess from "../CartResult/CartSuccess/CartSuccess";
import CartFailure from "../CartResult/CartFailure/CartFailure";
import CartPending from "../CartResult/CartPending/CartPending";
import WishList from '../WishList/WishList'

// !ACTIONS
import Users from "../AdminPanel/Users/Users";
import CompleteData from "../Authentication/CompleteData/CompleteData.jsx"
import Products from "../AdminPanel/Products/Products"
import { useGlobalContext } from "../../context"
import WorkingOnIt from "../WorkingOnIt/WorkingOnIt";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import UserOrder from "../Cart/UserOrders/UserOrder/UserOrder.jsx";
import OrderDetail from "../Cart/UserOrders/OrderDetail/OrderDetail.jsx"
import Orders from "../AdminPanel/Orders/Orders";
import CategoriesSubcat from "../AdminPanel/CategoriesSubcat/CategoriesSubcat";
import Economy from "../AdminPanel/Economy/Economy";
import NotFound from "../NotFound/NotFound";

function App() {
  const { closeSidebar} = useGlobalContext();
  let typeOfUser=localStorage.getItem("rol");
  var userLogged = localStorage.getItem('userlogged');

  return (
    <div className="App" onClick={closeSidebar}>
      <Suspense fallback={"Cargando..."}>
        <FirebaseAppProvider firebaseConfig={config}>
            <BrowserRouter>
              <Route path="/home" component={NavBar}/>
              <Switch>
              <Route exact path = "/home/cart/success/:orderid/:addressid/:residenceid" component = {CartSuccess}/>
              <Route exact path = "/home/cart/failure/" component = {CartFailure} />
              <Route exact path = "/home/cart/pending/" component = {CartPending} />
              <Route exact path="/" component={Landing}/>
              <Route exact path="/home/working" component={WorkingOnIt}/>
              <Route exact path="/home/item/:id" component={Product_Detail} />
              <Route exact path="/home" component={Home} />
              <Route exact path = "/checkout/:id" component = {Checkout}/>
              <Route exact path= '/home/cart' component= {Cart}/>
              {(userLogged === null )&&
              <Route exact path="/home/profile">{<Redirect to="/home" /> }</Route>
            }
              {(userLogged !== null )&&
              <>
              <Switch>
              <Route exact path="/home/profile" component={CompleteData} />
              <Route exact path = "/home/myorders" component = {UserOrder}/> 
              <Route exact path = "/home/wishlist" component = {WishList}/> 
              <Route exact path = "/home/myorders/:id" component = {OrderDetail}/> 
              {(typeOfUser === "admin" )&&
              <div className='adminContainer'>
              <Route path="/admin" component={SlideBar} />
              <Route exact path="/admin" component={Analytics} />
              <Route exact path="/admin/createProduct" component={CreateProduct} />
              <Route exact path="/admin/users" component={Users}/>
              <Route exact path="/admin/products" component={Products}/>
              <Route exact path="/admin/orders" component={Orders}/>
              <Route exact path="/admin/economy" component={Economy}/>
              <Route exact path="/admin/categories" component={CategoriesSubcat}/>
              <Route exact path="/admin/editProduct/:id" render={(props)=>(
                <EditProduct {...props}/>)}>
              </Route>
             
              </div>
              }
              <Route path='*' component={NotFound}/>
              </Switch>
              </>   
              }
              
              <Route path='*' component={NotFound}/>
              </Switch>
              <Route path="/home" component={Footer} />
            </BrowserRouter>
        </FirebaseAppProvider>
      </Suspense>
    </div>
  );
}

export default App;