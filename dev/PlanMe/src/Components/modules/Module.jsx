/***************************************************** 
  Fichier: Module.jsx
  Contexte: Module de base modulaire
  Auteur:  Jessika Longtin et Finnegan Simpson 
 *****************************************************/
import { useState } from 'react'
import './module.css'
import ModTexte from './text/text'



function Module(props) {
    let createModule = (moduleType) => {
        let moduleMap = {
            note: ModTexte
        };
        let NewModule = moduleMap[moduleType]
        return <NewModule />
    }
    let moduleElement = createModule(props.type);
    return (
        <div className="module relative z-0">
            {/* {moduleElement.children} */}
            {props.children}
        </div>
    )
}

export default Module
