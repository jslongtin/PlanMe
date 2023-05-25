/***************************************************** 
  Fichier: Algo.jsx
  Contexte: Algorithme de suggestions de contacts
  Auteur:  Jessika Longtin et Finnegan Simpson 
 *****************************************************/


class Algo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          graph : props
        };
      }
    
    suggestContacts = (graph, user, numberOfSuggestions) => { 
        const { graph } = this.state;
        let immediateConnections = graph.getSommet(user).getConnections()
        let potentialSuggestions = []

        immediateConnections.forEach(voisin => {
            voisinSecondaire = graph.getSommet(voisin).getConnections()
            potentialSuggestions.push(voisinSecondaire)
        });

        potentialSuggestions = removeSelfImmediateConnections(user, immediateConnections)
        suggestionFrequency = calculateFrequency(potentialSuggestions)
        potentialSuggestions = removeDuplicates(potentialSuggestions)
        
    };
    // FIXME: a mettre pour le tableau courant et non le vrai graph
    removeSelfImmediateConnections = ( user, immediateConnections) => {
        const { graph } = this.state;
        graph.removeSommet(user)
        immediateConnections.forEach(voisin => { 
            graph.removeSommet(voisin)
        });
        return graph

    };

    removeDuplicates = (potentialSuggestions) => {
        let suggestions = Array.from(new Set(potentialSuggestions));
        return suggestions
    };
    
    // TODO a revoir
    calculateFrequency = (potentialSuggestions) => {
        let suggestionFrequency = new Map();
        potentialSuggestions.forEach(suggestion => {
            if (suggestionFrequency.has(suggestion)) {
                suggestionFrequency.set(suggestion, suggestionFrequency.get(suggestion) + 1);
            } else {
                suggestionFrequency.set(suggestion, 1);
            }
        });
        return suggestionFrequency
    };
        

    

  render() {
    return (
      <div>
        <p>Algo</p>
      </div>
    );
  }
}

export default Algo;