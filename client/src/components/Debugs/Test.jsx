import React, { useState } from "react";
import {format} from 'date-fns'
function App() {
  const sampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  }

  const displayedText = showMore ? sampleText : sampleText.slice(0, 30);


  const dates = format(new Date(), 'eeee')
  return (
    <div>
      <h1>{dates}</h1>
      <p>{displayedText}</p>
      {sampleText.length > 30 && (
        <button onClick={toggleShowMore}>
          {showMore ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
}

export default App;
