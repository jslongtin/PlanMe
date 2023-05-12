import React, { useState } from "react";
import "./utilisateur.css";
import { useHistory } from "react-router-dom";
// creation utilisateur aevc argument et affichage
// ref: w3school react pages
function Utilisateur() {
  let [email, setEmail] = useState("");
  let [username, setUsername] = useState("");
  let [contacts, setContacts] = useState("");
  let [suggestedContacts, setSuggestedContacts] = useState("");
  let [profilePicture, setProfilePicture] = useState("");
  const history = useHistory();
  const sessEmail = sessionStorage.getItem("email");
  const sessName = sessionStorage.getItem("name");
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle form submission to update profile
  };

  let back = () => {
    history.push("/dashboard");
}

  return (
    <div id="profileContainer">
      
      <form onSubmit={handleSubmit}>
      <h1>{sessName}'s Profile</h1>
        <label>
          Email:
          <input
            type="email"
            value={sessEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Username:
          <input
            type="text"
            value={sessName}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Contacts:
          <textarea
            value={contacts}
            onChange={(e) => setContacts(e.target.value)}
          />
        </label>
        <br />
        <label>
          Suggested Contacts:
          <textarea
            value={suggestedContacts}
            onChange={(e) => setSuggestedContacts(e.target.value)}
          />
        </label>
        <br />
        <label>
          Profile Picture:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
        </label>
        <br />
        <button type="submit">Update Profile</button>
        <button onClick={back} >Retour</button>
      </form>
    </div>
  );
}

export default Utilisateur;
