import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'


// creation utilisateur aevc argument et affichage
function Utilisateur(props) {
    let id = props.id
    let prenom = props.prenom
    let nom = props.nom
    let courriel = props.courriel
    let motDePasse = props.motDePasse
    let theme = props.theme
    let photoDeProfil = props.photoDeProfil
    let contacts = props.contacts


    return <h2> mon nom est {prenom} {nom} </h2>
    

}

export default Utilisateur