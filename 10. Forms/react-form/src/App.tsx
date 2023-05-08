// import { useState } from "react";
// import TrackerForm from "./components/TrackerForm";
// import TrackerTable from "./components/TrackerTable";

// export interface TrackProp {
//   description: string;
//   amount: number;
//   category: string;
//   id: number;
// }

// function App() {
//   const [tracks, setTracks] = useState<TrackProp[]>([]);
//   const [categories, setCategories] = useState([
//     "Groceries",
//     "Utilities",
//     "Entertainment",
//   ]);

//   const addTrack = ({ description, amount, category }: TrackProp) => {
//     setTracks([
//       ...tracks,
//       { description, amount, category, id: tracks.length + 1 },
//     ]);
//   };

//   const removeTrack = (trackId: number) => {
//     setTracks(tracks.filter((track) => track.id !== trackId));
//   };

//   return (
//     <>
//       <TrackerForm addTrack={addTrack} categories={categories} />
//       <TrackerTable tracks={tracks} removeTrack={removeTrack} />
//     </>
//   );
// }

// export default App;

import { useState } from "react";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import categories from "./expense-tracker/categories";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 10, category: "Utilities" },
    { id: 2, description: "aaa", amount: 10, category: "Utilities" },
    { id: 3, description: "aaa", amount: 10, category: "Utilities" },
    { id: 4, description: "aaa", amount: 10, category: "Utilities" },
  ]);

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <div>
      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
    </div>
  );
}

export default App;
