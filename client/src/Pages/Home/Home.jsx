import React from 'react'
import Products from '../../Components/Products/Products'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/NavBar/NavBar'
import SearchBar from '../../Components/SearchBar/SearchBar'
import Filters from '../../Components/Filters/Filters'
import GeoLocation from '../../Components/GeoLocation/GeoLocation'
// import Order from '../../Components/Order/Order'

function Home() {
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
        </div>
    )
}

export default Home;