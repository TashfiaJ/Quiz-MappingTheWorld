import React from "react";
import Quiz from "./components/Quiz";
import MCQForm from "./components/MCQForm";
import DeleteMCQ from "./components/DeleteMCQ";
import UpdateMCQ from "./components/UpdateMCQ";
import Leaderboard from "./components/Leaderboard";

function App() {
  
  return (
    <div className="App">
      <Quiz />
      <MCQForm />
      <DeleteMCQ />
      <UpdateMCQ />
      <Leaderboard />
    </div>
  );
}

export default App;
