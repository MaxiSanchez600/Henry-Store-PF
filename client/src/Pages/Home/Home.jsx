import React from 'react';
import { connect } from 'react-redux';
import { getAllFilteredProducts } from '../../Redux/actions/actionsProducts';
import Products from '../../Components/Products/Products';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/NavBar/NavBar';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Filters from '../../Components/Filters/Filters';
import Order from '../../Components/Order/Order';

function Home({ queriesFromReducer, getProductsWithoutFilters }) {
 
    function handleResetFilters(e) {
        e.preventDefault();
        getProductsWithoutFilters({});
    }

    return (
            <div >
            <Navbar />
            <div className="search_container">
                <SearchBar />
                {/* <div className="search"></div> */}
            </div>
            <div className="content_Home" >
                <div className="content_SidebarLeft" >
                    {/* <Order /> */}
                    {
                        Object.keys(queriesFromReducer).length ?
                            <button className="reset_button" onClick={e => handleResetFilters(e)}>Resetea tus filtros</button> :
                            <div className="reset_button_hidden"></div>
                    }
                    <Filters />
                </div>
                <div className="body_Home">
                    <div className="products">
                        <Products />
                    </div>
                </div>
                <Sidebar />
            </div>
            <Footer />
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