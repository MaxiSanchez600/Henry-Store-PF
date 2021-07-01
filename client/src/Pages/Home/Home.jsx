import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllFilteredProducts, getMyWishList } from '../../Redux/actions/actionsProducts';
import Products from '../../Components/Products/Products';
import SearchBar from '../../Components/SearchBar/SearchBar';
import FilterCategories from '../../Components/FilterCategories/FilterCategories';
import Filters from '../../Components/Filters/Filters';
import Sidebar from "../../Components/Sidebar/Sidebar";
import Order from "../../Components/Order/Order";
function Home({ queriesFromReducer, getProductsWithoutFilters, getMyWishList, MyWishList }) {

    const allQueries = Object.keys(queriesFromReducer);

    const [currency, ...removedCurrency] = [...allQueries];

    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, []);

    function handleResetFilters(e) {
        e.preventDefault();

        for (let i = 0; i < removedCurrency.length; i++) {
            const filterToBeRemoved = document.getElementById(`filter_name_${removedCurrency[i]}`);
            if (filterToBeRemoved) {
                switch (filterToBeRemoved.type) {
                    case "number":
                        filterToBeRemoved.value = "";
                        break;
                    case "select-one":
                        filterToBeRemoved.value = "default";
                        break;
                    default: break;
                }
            }
            delete queriesFromReducer[removedCurrency[i]];
        }
        getProductsWithoutFilters({ ...queriesFromReducer });
    }

    useEffect(() => {
        let id_user = localStorage.getItem('userlogged')
        getMyWishList(id_user)
    }, [])

    return (
        <main>
            <div className="search_container">
                <FilterCategories />
                <SearchBar />
            </div>
            <div className="content_Home" >
                <div className="content_SidebarLeft" >
                    {
                        removedCurrency.length ?
                            <button className="reset_button" onClick={e => handleResetFilters(e)}>Resetea tus filtros</button> :
                            <div className="reset_button_hidden"></div>
                    }
                    <Filters />
                </div>
                <div className="body_Home">
                    <div className="order">
                        <Order />
                    </div>
                    <div className="products">
                        <Products MyWishList={MyWishList} />
                    </div>
                </div>
                <Sidebar />
            </div>
        </main>
    )
}
function mapStateToProps(state) {
    return {
        queriesFromReducer: state.products.queries,
        MyWishList: state.products.wishlist,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProductsWithoutFilters: (allQueries) => dispatch(getAllFilteredProducts(allQueries)),
        getMyWishList: (Id_User) => dispatch(getMyWishList(Id_User)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);