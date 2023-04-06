import React, { useState } from 'react';
import Module from '../modules/module';
import ModTexte from '../modules/text/text';

function Page() {
  const [modTexteList, setModTexteList] = useState([]); // state variable to track list of ModTexte modules

  const handleAddModTexte = () => {
    setModTexteList([...modTexteList, <ModTexte key={modTexteList.length} />]); // ref : chatgpt -> creer nouveau module on click handler
  };



  
  return (
    <div id="modulesContainer">
       
      {modTexteList.map((modTexte, index) => (
        <div key={index}>{modTexte}</div>
      ))}
      <button onClick={handleAddModTexte}>Add ModTexte</button>
    </div>
    
  );
}

export default Page;
