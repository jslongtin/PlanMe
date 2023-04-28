# Projet_Synthese
CVM: -C61
Clone de notion
Nom du projet : PlanMe
Equipiers: Finnegan Simpson et Jessika Longtin



Docker - BD hosting
https://hevodata.com/learn/docker-postgresql/

with nodejs as a context : 
https://www.section.io/engineering-education/build-and-dockerize-a-full-stack-react-app-with-nodejs-and-nginx/







page ref code for load notes : 


import React, { useState, useEffect } from 'react';
import Module from '../modules/module';
import ModTexte from '../modules/text/text';
import Calendrier from '../modules/calandar/calandar';
import './page.css';
import AddMod from '../modules/addMod/addMod';

function Page() {
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const rep = await fetch("http://127.0.0.1/api/getnotes")
        if (rep.ok) {
          const data = await rep.json();
          const modTextComponents = data.map((note,index) => {
            <ModTexte key={index} titre={note.titre} note={note.note} />
          });
          setNotes(modTextComponents);
        } else {
          console.error("Failed to fetch notes");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotes();
  }, []);
  
  
  const handleAddModTexte = () => {
    setNotes([...notes, <ModTexte key={notes.length} />]);
  }
  
    return (
      <div id="modulesContainer">
        <AddMod onAddModTexte={handleAddModTexte} />
        {notes.map((noteComponent) => (
          <div key={noteComponent.key}>{noteComponent}</div>
        ))}
      </div>
    );
  }
export default Page;
