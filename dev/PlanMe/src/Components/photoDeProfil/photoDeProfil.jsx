/***************************************************** 
    Fichier: photoDeProfil.jsx
    Contexte: Lien page de modification du profil utilisateur 
    Auteurs: Jessika Longtin et Finnegan Simpson
 *****************************************************/

import React, { Component } from 'react'
import './photoDeProfil.css'
import { useHistory } from "react-router-dom";

export default function PhotoDeProfil(){
  let history = useHistory();
    return (
     <button id="pdp" onClick={() =>{ history.push("/profile")}}></button>
    )
  }

