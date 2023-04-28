import React from "react";
import Module from "../module";
import { useState } from "react";
import "./text.css";

function ModTexte() {
  const [titre, setTitre] = useState("Titre");
  const [text, setText] = useState("");

  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  const handleTitreChange = (event) => {
    setTitre(event.target.value);
  };
  const handleBoldClick = () => {
    document.execCommand("bold", false, null);
    setBold(!bold);
    document.querySelector(".editor").focus();
  };

  const handleItalicClick = () => {
    document.execCommand("italic", false, null);
    setItalic(!italic);
    document.querySelector(".editor").focus();
  };

  const handleUnderlineClick = () => {
    document.execCommand("underline", false, null);
    setUnderline(!underline);
    document.querySelector(".editor").focus();
  };

  const handleSaveClick = async () => {
    // ref pour sessionstorage : https://contactmentor.com/session-storage-react-js/
    const owner = sessionStorage.getItem("email");
    const note = document.querySelector(".editor").innerHTML;
    const titre = document.querySelector(".titre").innerHTML;

    const response = await fetch("http://127.0.0.1:3001/api/savenotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ owner: owner, titre: titre, note: note }),
    });
    if (response.ok) {
      const data = await response.text();
      alert(data);
    } else {
      alert("Failed to save note");
    }
  };

  return (
    <Module>
      {/* <div>{sessionStorage.getItem("username")}</div> */}
      <div
        className="titre"
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html: text }}
        onInput={handleTitreChange}
      />
      <div className="toolbar">
        <button className={bold ? "active" : ""} onClick={handleBoldClick}>
          B
        </button>
        <button className={italic ? "active" : ""} onClick={handleItalicClick}>
          I
        </button>
        <button
          className={underline ? "active" : ""}
          onClick={handleUnderlineClick}
        >
          U
        </button>
        <button onClick={handleSaveClick}>Save</button>
      </div>
      <div
        className="editor"
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html: text }}
        onInput={handleTextChange}
        
      />
    </Module>
  );
}

export default ModTexte;
