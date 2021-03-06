import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const showRandomAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const voteSelected = () => {
    const copy = { ...points };
    copy[selected] = copy[selected] + 1;
    setPoints(copy);
  };

  const getMostVotesIndex = () => {
    let maxPointsIndex = 0;
    for (let i = 1; i < anecdotes.length; i++) {
      if (points[i] > points[maxPointsIndex]) {
        maxPointsIndex = i;
      }
    }
    return maxPointsIndex;
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={showRandomAnecdote}>next anecdote</button>
      <button onClick={voteSelected}>vote</button>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[getMostVotesIndex()]}</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
