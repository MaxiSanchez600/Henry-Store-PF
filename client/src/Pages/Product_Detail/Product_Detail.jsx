import React from 'react'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/NavBar/NavBar'
import SearchBar from '../../Components/SearchBar/SearchBar'
import Footer from '../../Components/Footer/Footer'


function Product_Detail() {
    return (
        <div className="content_Home">
           <Header />
            <Navbar />
            <SearchBar />
            <div className="body_Home">
                <div className="webcontent_home">
                  
                   
                </div>
            </div>
            <Footer />

        </div>
    )
}

export default Product_Detail
