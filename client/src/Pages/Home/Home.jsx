import React from 'react'
import Products from '../../Components/Products/Products'
import Navbar from '../../Components/NavBar/NavBar'
import SearchBar from '../../Components/SearchBar/SearchBar'


function Home() {
    return (
        <div>
            <h1>Henry Store!</h1>
            <Navbar/>
            <SearchBar/>
            <Products/>
        </div>
    )
}

export default Home
