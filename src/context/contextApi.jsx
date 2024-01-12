import React, { createContext, useState, useEffect } from "react";
import { fetchDataFromApi } from '../utils/api';

export const Context = createContext();

export const AppContext = (props) => {
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectCategories, setSelectCategories] = useState("Accueil");
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        fetchSelectedCategory(selectCategories)
    }, [selectCategories])

    const fetchSelectedCategory = (query) => {
        setLoading(true)
        let apiUrl = '';
        if(query === 'Accueil'){
            apiUrl = 'home/';
        } else {
            apiUrl = `search/?q=${query}`;
        }

        fetchDataFromApi(apiUrl).then(({ contents }) => {
            setSearchResults(contents);
            setLoading(false);
        })
    }

    return (

        <Context.Provider
            value={{
                loading,
                setLoading,
                searchResults,
                setSearchResults,
                selectCategories,
                setSelectCategories,
                mobileMenu,
                setMobileMenu
            }}>
            {props.children}
        </Context.Provider>
    )
}
