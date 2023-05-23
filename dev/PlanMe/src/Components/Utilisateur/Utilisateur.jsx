import React, { useState, useEffect } from "react";
import "./utilisateur.css";
import { useHistory } from "react-router-dom";
import Graph from "../Contacts/Graph";


export default function Utilisateur() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
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
      await graph.loadBd(); // Wait for the loadBd function to complete

      // Perform any additional operations with the loaded data

      setIsLoaded(true); // Set the isLoaded state to true after loading the data
    };

    loadGraphData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle form submission to update profile
  };
 
  const back = () => {
    history.push("/dashboard");
  };
  const addContact= async (contacts) => {
    // e.preventDefault();
    console.log(contacts,sessEmail);
    const response = await fetch("http://127.0.0.1:3001/api/addContact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessEmail, contacts }),
    });
    if (response.ok) {
      // const data = await response.json();
      console.log("Contact added");
    } else {
      alert("Error in inserting contact");
    }
  };
  // TODO
  const getContact= async (e) => {
    const response = await fetch("http://127.0.0.1:3001/api/getContacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      // console.log(data);

      data.forEach((element) => {
        let s1 = this.addSommet(element.contact);
        let s2 = this.addSommet(element.utilisateur_email);
        this.addArete(s1, s2, 1);
      });
      let user = sessionStorage.getItem("email");
      // user = this.getSommet(user);
      // let suggs = this.suggestContacts(user,3);
      // console.log(suggs);
    } else {
      alert("Request failed");
    }
  };
  return isLoaded ? (
    <div id="profileContainer">
       <ComponentWrapper component={Graph}setSuggestedContacts={setSuggestedContacts} />
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
          {/* <textarea
            value={suggestedContacts}
            onChange={(e) => setSuggestedContacts(e.target.value)}
          /> */}
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

const ComponentWrapper = ({ component: Component, setSuggestedContacts  }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const sessEmail = sessionStorage.getItem("email");

    // Call the function of the passed component on mounting
    if (Component ) {
      const graph = new Component();
      graph.loadBd().then(() => {
        const suggs = graph.suggestContacts(sessEmail, 2);
        let suggsContacts = [];
        suggs.forEach((element) => {  
          suggsContacts.push(element.sommet.props.id);
          console.log(element.sommet.props.id);
        });
        console.log(suggsContacts);
        // sessionStorage.setItem("suggestedContacts", JSON.stringify(suggsContacts));
        setSuggestedContacts(suggsContacts);
        setIsMounted(true); // Set the mounting status to true after loading and suggesting contacts
      });
    }
  }, [Component]);

  return isMounted ? <Component /> : null;
};