import { useState } from 'react'
import reactLogo from '../assets/img/Hello_Kitty.svg'

import '../App.css'


// creation utilisateur aevc argument et affichage
// ref: w3school react pages
function Utilisateur(props) {
    let id = props.id
    let [prenom, setPrenom] = useState(props.prenom)
    let [nom, setNom] = useState(props.nom)
    let [courriel, setCourriel] = useState(props.courriel)
    let [motDePasse, setMotDePasse] = useState(props.motDePasse)
    let [theme, setTheme] = useState(props.theme)
    let [photoDeProfil, setPhotoDeProfil] = useState(props.photoDeProfil)
    let [contacts, setContacts] = useState(props.contacts)

    let handleSubmit = (event) => {
        event.preventDefault();
        alert(`Mon nom est ${prenom} ${nom} ${courriel}`)
    }

    let handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        if (name === "nom") {
            setNom(value)
        } else if (name === "prenom") {
            setPrenom(value)
        } else if (name === "courriel") {
            setCourriel(value)
        }
    }
    return (
        <>
            <h1> Creer votre compte </h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Prenom : 
                    <input
                        type="text"
                        name="prenom" 
                        onChange={handleChange}
                    />
                </label>
                <input type="submit" value="Submit" onClick={() => handleSubmit} />
                <label>
                    Nom : 
                    <input
                        type="text"
                        name="nom" 
                        onChange={handleChange}
                    />
                </label>
                <input type="submit" value="Submit" onClick={() => handleSubmit} />
                <label>
                    Courriel : 
                    <input
                        type="text"
                        name="courriel" 
                        onChange={handleChange}
                    />
                </label>
                <input type="submit" value="Submit" onClick={() => handleSubmit} />
            </form>
        </>
    )


}

export default Utilisateur