import React from 'react';

// COMPONENTES
import FilterCategories from "../FilterCategories/FilterCategories";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
    return (
        <nav>
            <SearchBar />
            <FilterCategories />
        </nav>
    );
};

export default NavBar;