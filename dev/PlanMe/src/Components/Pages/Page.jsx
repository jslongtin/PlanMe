import React, { useState } from "react";
import ModTexte from "../modules/text/text";
import Cal from "../modules/Calendar/Cal";

function Page() {
  const [modules, setModules] = useState([]);
  const [showModule, setShowModule] = useState(false);
  
  // setModules([...modules, { type: moduleType }]);: updates the modules state by creating a new array that consists of all the existing modules (...modules using the spread syntax) 
  // and a new object representing the newly added module. 
  // The new object contains a single property type, which is set to the value of moduleType (the type of module to be added, either "note" or "calendar"). ref : chat gpt
  const handleModules = (moduleType) => {
    setModules([...modules, { type: moduleType }]);
    setShowModule(false); 
  };
// TODO finir la fonction addModule avec l'api
  let addModule = async (e) => { 
    let pageCourante = sessionStorage.getItem("activePage")
  // e.preventDefault();
  const response = await fetch("http://127.0.0.1:3001/api/newModule", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({e ,pageCourante }),
  });
  if (response.ok) {
    handleModules(e)
  } else {
    alert("Invalid email or password");
  }
};

  const moduleToggle = () => {
    setShowModule(!showModule);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="relative z-10">
        <button
          onClick={moduleToggle}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add Module
        </button>

        {showModule && (
          <div className="absolute z-20 bg-white shadow-md rounded p-4 mt-2">
            <button
              // onClick={() => addModule("note")}
              onClick={() => handleModules("note")}
              className="bg-green-500 text-white px-4 py-2 rounded mb-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Add Note
            </button>
            <button
              onClick={() => handleModules("calendar")}
              className="bg-yellow-500 text-white px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
            >
              Add Calendar
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {modules.map((module, index) => {
          switch (module.type) {
            case "note":
              return <ModTexte key={index} className="relative z-0" />;
            case "calendar":
              return <Cal key={index} className="relative z-0" />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}

export default Page;
