/***************************************************** 
  Fichier: addMod.jsx
  Contexte: boutons d'ajout et de modification de modules
  *Non utilisé
  Auteur:  Jessika Longtin et Finnegan Simpson 
 *****************************************************/
import React from 'react'
import './addMod.css'

function AddMod() {
  return (
    <div className='addMod'>
        <button><img className='plus' src="..\..\..\src\assets\images\plus.png" alt="plus" /></button>
        <button><img className='mod' src="..\..\..\src\assets\images\mod.png" alt="plus" /></button>
 </div>
  )
}

export default AddMod