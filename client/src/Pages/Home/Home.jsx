import React from 'react';
import { connect } from 'react-redux';
import { getAllFilteredProducts } from '../../Redux/actions/actionsProducts';
import Products from '../../Components/Products/Products';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/NavBar/NavBar';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Filters from '../../Components/Filters/Filters';
import GeoLocation from '../../Components/GeoLocation/GeoLocation';
import Order from '../../Components/Order/Order';
import Sidebar from "../../Components/Sidebar/Sidebar";

function Home({ queriesFromReducer, getProductsWithoutFilters }) {
 

    function handleResetFilters(e) {
        e.preventDefault();
        getProductsWithoutFilters({});
    }
    
    return (
        <div className="content_Home" >
            <Navbar />
            <div className="body_Home">
                <div className="webcontent_home">
                    {
                        Object.keys(queriesFromReducer).length ?
                            <button onClick={e => handleResetFilters(e)}>Resetea tus filtros</button> : ""
                    }
                    <Filters />
                    <Order />
                    <Products />
                </div>
            </div>
            <Footer />
            <Sidebar />
        </div>
    )
}
//Si explota es esto xD
function mapStateToProps(state) {
    return {
        queriesFromReducer: state.products.queries
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProductsWithoutFilters: (allQueries) => dispatch(getAllFilteredProducts(allQueries))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);