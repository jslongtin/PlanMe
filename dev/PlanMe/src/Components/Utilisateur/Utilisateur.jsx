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

  // useEffect(() => {
  //   const storedContacts = sessionStorage.getItem("suggestedContacts");
  //   if (storedContacts) {
  //     setSuggestedContacts(JSON.parse(storedContacts));
  //   }
  // }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle form submission to update profile
  };

  const back = () => {
    history.push("/dashboard");
  };

  return (
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
      <button key={contact}>{contact}</button>
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
    </div>
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