/***************************************************** 
  Fichier: Utilisateur.jsx
  Contexte: Contenu et affichage du profil de l'utilisateur
  Auteur: Jessika Longtin et Finnegan Simpson
 *****************************************************/
import React, { useState, useEffect } from "react";
import "./Utilisateur.css";
import { useHistory } from "react-router-dom";
import Graph from "../Contacts/Graph";


export default function Utilisateur() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [currentContacts, setCurrentContacts] = useState("");
  const [contacts, setContacts] = useState("");
  const [suggestedContacts, setSuggestedContacts] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const history = useHistory();
  const sessEmail = sessionStorage.getItem("email");
  const sessName = sessionStorage.getItem("username");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadGraphData = async () => {
      const graph = new Graph();
      await graph.loadBd();
      setIsLoaded(true);
    };
    loadGraphData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const back = () => {
    history.push("/dashboard");
  };
  const addContact = async (contacts) => {
    console.log(contacts, sessEmail);
    const response = await fetch("http://127.0.0.1:3001/api/addContact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessEmail, contacts }),
    });
    if (response.ok) {
      console.log("Contact added");
      getContact();
    } else {
      alert("Error in inserting contact");
    }
  };
  const getContact = async (e) => {
    const response = await fetch("http://127.0.0.1:3001/api/getUserContacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessEmail }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      let contactsString = "";
      data.forEach((element) => {
        contactsString += element.contact + "\n";
      });
      setCurrentContacts(contactsString);

    } else {
      alert("Request failed");
    }
  };
  return isLoaded ? (
    <div id="profileContainer">
      <ComponentWrapper component={Graph} setSuggestedContacts={setSuggestedContacts} />
      <form onSubmit={handleSubmit} id="form">
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
            id="contacts"
            value={currentContacts}
            onLoad={getContact()}
            onChange={(e) => setContacts(e.target.value)}
            onFocus={getContact}
          />
        </label>
        <br />
        <label>
          Suggested Contacts:
          <div>
            {suggestedContacts && suggestedContacts.length > 0 && (
              suggestedContacts.map((contact) => (
                <button key={contact} onClick={() => addContact(contact)}>{contact}</button>
              ))
            )}
          </div>
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
        <button onClick={back}>Retour</button>
      </form>
    </div>)
    : (
      <div>Loading...</div>

    );
}

const ComponentWrapper = ({ component: Component, setSuggestedContacts }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const sessEmail = sessionStorage.getItem("email");

    // attant que graph soit monté pour faire les suggestions de contacts
    if (Component) {
      const graph = new Component();
      graph.loadBd().then(() => {
        const suggs = graph.suggestContacts(sessEmail, 2);
        let suggsContacts = [];
        suggs.forEach((element) => {
          suggsContacts.push(element.sommet.props.id);

        });

        setSuggestedContacts(suggsContacts);
        setIsMounted(true);
      });
    }
  }, [Component]);

  return isMounted ? <Component /> : null;
};