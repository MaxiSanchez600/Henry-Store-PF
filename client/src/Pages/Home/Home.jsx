import React from 'react'
import Products from '../../Components/Products/Products'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/NavBar/NavBar'
import SearchBar from '../../Components/SearchBar/SearchBar'
import Filters from '../../Components/Filters/Filters'
import Ubication from '../../Components/Ubication/Ubication'

function Home() {
    return (
        <div>
            <Header />
            <Ubication/>
            <Navbar />
            <SearchBar />
            <div className="body_Home">
                <Filters />
                <Products />
            </div>
            <Footer />
        </div>
    )
}

export default Home;