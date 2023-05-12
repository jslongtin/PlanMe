import React, { useState } from "react";
import "./utilisateur.css";

// creation utilisateur aevc argument et affichage
// ref: w3school react pages
function Utilisateur() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState("");
  const [contacts, setContacts] = useState("");
  const [suggestedContacts, setSuggestedContacts] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle form submission to update profile
  };

  return (
    <div>
      <h1>My Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Theme:
          <input
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
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
      </form>
    </div>
  );
}

export default Utilisateur;
