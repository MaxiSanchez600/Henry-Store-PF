import React from 'react';
import { connect } from 'react-redux';
import { getAllFilteredProducts } from '../../Redux/actions/actionsProducts';
import Products from '../../Components/Products/Products';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Filters from '../../Components/Filters/Filters';
import Sidebar from "../../Components/Sidebar/Sidebar";
function Home({ queriesFromReducer, getProductsWithoutFilters }) {
 
    function handleResetFilters(e) {
        e.preventDefault();
        // console.log("Object.keys(queriesFromReducer): ", Object.keys(queriesFromReducer));
        // console.log("document.getElementById(): ", document.getElementById());
        const allQueries = Object.keys(queriesFromReducer);
        
        for (let i = 0; i < allQueries.length; i++) {
            console.log("allQueries[i]: ", allQueries[i]);
            delete queriesFromReducer[allQueries[i]];
        }
        console.log("queriesFromReducer: ", queriesFromReducer);
        getProductsWithoutFilters({});
    }

    return (
        <div >
            <div className="search_container">
                <SearchBar />
            </div>
            <div className="content_Home" >
                <div className="content_SidebarLeft" >
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
        </div>
    )
}
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