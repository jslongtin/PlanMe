import React, { useState } from "react";
import Module from "../modules/module";
import ModTexte from "../modules/text/text";
import "./page.css";
import AddMod from "../modules/addMod/addMod";
import Cal from "../modules/Calendar/Cal";

function Page() {
  // const [modTexteList, setModTexteList] = useState([]); // state variable to track list of ModTexte modules

  // const handleAddModTexte = () => {
  //   setModTexteList([...modTexteList, <ModTexte key={modTexteList.length} />]); // ref : chatgpt -> creer nouveau module on click handler
  // };

  return (
    // <div id="modulesContainer">
    //   {/* <TestCalendrier /> */}
    //   {/* <AddMod /> */}
    //   {/* <ModTexte/>   */}
    //   {/* <Module type="note" /> */}
    //   {/* <Calendrier /> */}
    //   {/* {modTexteList.map((modTexte, index) => (
    //     <div key={index}>{modTexte}</div>
    //     ))}
    //   <button onClick={handleAddModTexte}>Add ModTexte</button> */}
    // </div>
    <div id="modulesContainer">
      <Cal />
    </div>
  );
}

export default Page;
