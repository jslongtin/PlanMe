import React from 'react'
import './navbar.css'
import PhotoDeProfil from '../photoDeProfil/photoDeProfil'
import { useState } from 'react'
import Page from '../Pages/page'
import Search from "../search/search"

function Navbar(props, { onPageChange }) {
    // REVIEW
    let id = props.id
    let titre = props.titre
    let icone = props.icone

    // ref: https://dev.to/francodalessio/understanding-react-elements-and-jsx-4dc3
    // aide création attributs 
    // REVIEW
    const addPage = (page) => {
        let section = <div className="pageSection"><div className="iconePageSection"></div> {page.icone} </div>
        ReactDOM.render(
            section,
            document.getElementById('menuPages')
        );
    }
    const username = sessionStorage.getItem('username');
    return (
        <div id="menuBar">
            <div id="menuTopSection">
                <div id="uiUser" >
                    <div className="pdp"><PhotoDeProfil /> </div>
                    <div id="navBarUsername" > {username}'s PlanMe</div>
                </div>

                <div className="search w-50 h-50"> <Search /></div>
                {/* TODO */}
                {/* allet chercher le nom de l'utilisateeur */}

                <button onClick={() => {
                    sessionStorage.clear();
                    window.location.reload();
                }}>Logout</button>

            </div>
            // REVIEW
            <div id="menuPages"><div className="pageSection"><img src="../../src/assets/images/arrow.jpg" alt="fleche" /><div className="iconePageSection">icone</div> <div className="textPageSection"> titre</div> </div></div>
            {/* <div id="menuPages">{addPage}</div> */}
        </div>

    )
}


export default Navbar