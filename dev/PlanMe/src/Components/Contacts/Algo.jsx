
// ETAPES
// 1. Choose a user for whom you want to suggest contacts.
// 2. Retrieve the immediate connections (neighbors) of the chosen user from the graph.
// 3. For each immediate connection, retrieve their connections (neighbors) as well. These connections are potential suggestions.
// 4. Remove the chosen user and their immediate connections from the potential suggestions.
// 5. Calculate the frequency of occurrence for each potential suggestion. The more frequently a user appears, the higher the chance of being a valuable contact.
// 6. Sort the potential suggestions based on the frequency of occurrence in descending order.
// 7. Return the top N users from the sorted list as suggested contacts.


// function suggestContacts(graph, user, numberOfSuggestions):
//     immediateConnections = graph.getNeighbors(user)
//     potentialSuggestions = []

//     for connection in immediateConnections:
//         secondaryConnections = graph.getNeighbors(connection)
//         potentialSuggestions.push(...secondaryConnections)

//     potentialSuggestions = removeDuplicates(potentialSuggestions)
//     potentialSuggestions = removeUserAndImmediateConnections(potentialSuggestions, user, immediateConnections)
//     suggestionFrequency = calculateFrequency(potentialSuggestions)

//     sortedSuggestions = sortSuggestionsByFrequency(suggestionFrequency)

//     return sortedSuggestions.slice(0, numberOfSuggestions)
// ```

// Note that `graph.getNeighbors(user)` returns the immediate connections (neighbors) of a user in the graph. `removeDuplicates()` removes any duplicate suggestions. `removeUserAndImmediateConnections()` removes the chosen user and their immediate connections from the potential suggestions. `calculateFrequency()` counts the frequency of occurrence for each suggestion. `sortSuggestionsByFrequency()` sorts the potential suggestions based on frequency. `slice()` returns the top N suggestions.



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