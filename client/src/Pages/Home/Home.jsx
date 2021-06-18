import React from 'react'
import Products from '../../Components/Products/Products'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/NavBar/NavBar'
import SearchBar from '../../Components/SearchBar/SearchBar'
import Filters from '../../Components/Filters/Filters'
import GeoLocation from '../../Components/GeoLocation/GeoLocation'
// import Order from '../../Components/Order/Order'
import { useDispatch } from 'react-redux';
import {getUserLogin} from "../../Redux/actions/actionsUsers"
import { firebase } from "../../Config/firebase-config"
import Sidebar from "../../Components/Sidebar/Sidebar";

function Home() {
    const dispatch = useDispatch();
    let user = firebase.auth().currentUser;
    if (user) {
        dispatch(getUserLogin(user.uid))
        
      }
     
    return (
        <div className="content_Home" >
            <Header />
            <GeoLocation/>
            <Navbar />
            <SearchBar />
           
            <div className="body_Home">
                <div className="webcontent_home">
                    <Filters />
                    {/* <Order /> */}
                    <Products />
                </div>
            </div>
            <Footer />
            <Sidebar />
        </div>
    )
}

export default Home;