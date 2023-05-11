import React, { Component } from 'react'
import './photoDeProfil.css'
import { useHistory } from "react-router-dom";

function PhotoDeProfil(){
  let history = useHistory();
    return (
     <button id="pdp" onClick={() =>{ history.push("/profile")}}></button>
    )
  }

export default PhotoDeProfil