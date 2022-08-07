import "./App.css";
import CardSet from "./CardSet";
import cards from "./cards";

function App() {
  return (
    <div className="App">
      <CardSet cards={cards} />
    </div>
  );
}

export default App;
