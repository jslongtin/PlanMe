import React from 'react'
import Module from '../module'
import { useState } from 'react'
import './text.css'

function ModTexte() {
  
  const [text, setText] = useState("");
  // useState(false) = valeure par default
  
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value)

  }
  const handleBoldClick = () => {
    document.execCommand('bold', false, null);
    setBold(!bold);
    document.querySelector(".editor").focus();
  };
  
  const handleItalicClick = () => {
    document.execCommand('italic', false, null);
    setItalic(!italic);
    document.querySelector(".editor").focus();
  };
  
  const handleUnderlineClick = () => {
    document.execCommand('underline', false, null);
    setUnderline(!underline);
    document.querySelector(".editor").focus();
  };
  // const handleSaveClick = async () => {
  //   e.preventDefault();
  //   // Send registration request to backend
  //   const response = await fetch("http://127.0.0.1:3001/api/savenotes", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ id, title, content }),
  //   });
  //   if (response.ok) {
  //     console.log({ id, title, content });
  //     alert("Save successful"); // Show success message if save is successful
      
  //   } else {
  //     alert("save failed"); // Show error message if save fails
  //   }
 
    return (
      <Module>   <div className="toolbar">
        <button className={bold ? "active" : ""} onClick={handleBoldClick}>B</button>
        <button className={italic ? "active" : ""} onClick={handleItalicClick}>I</button>
        <button className={underline ? "active" : ""} onClick={handleUnderlineClick}>U</button>
        <button >Save</button>
      </div>
        <div
          className="editor"
          contentEditable="true"
          dangerouslySetInnerHTML={{ __html: text }}
          onInput={handleTextChange}
        /> </Module>
    )

// };
}

  export default ModTexte