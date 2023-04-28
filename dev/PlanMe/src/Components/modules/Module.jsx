import { useState } from 'react'
import './module.css'
import ModTexte from './text/text'



function Module(props) {
    let createModule = (moduleType) => {
        let moduleMap = {
            note: ModTexte
        };

        //TODO faire du checking so ont passe la bonne chose
        let NewModule = moduleMap[moduleType]
        return <NewModule />
    }
    let moduleElement = createModule(props.type);
    return (
        <div className="module">
            {moduleElement.children}
            {/* {props.children} */}
        </div>
    )
}

export default Module
